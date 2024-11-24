//@ts-nocheck
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

const WHITELIST_RETENTION_PERIOD = 24 * 60 * 60 * 1000; // 24 hours

interface WhitelistEntry {
  ipAddress: string;
  comment: string;
}

async function whitelistIP(configService: ConfigService) {
  const apiBaseUrl = 'https://cloud.mongodb.com/api/atlas/v1.0';
  const publicKey = configService.get<string>('MONGO_ATLAS_PUBLIC_KEY');
  const privateKey = configService.get<string>('MONGO_ATLAS_PRIVATE_KEY');
  const projectId = configService.get<string>('MONGO_ATLAS_PROJECT_ID');

  const whitelistUrl = `${apiBaseUrl}/groups/${projectId}/accessList`;

  try {
    const newIpAddress = await fetchCurrentIP();
    const existingEntries = await fetchWhitelistEntries(
      whitelistUrl,
      publicKey,
      privateKey,
    );
    const now = new Date();

    // Add new IP to the whitelist if not present
    if (!isIPWhitelisted(newIpAddress, existingEntries)) {
      await addIPToWhitelist(newIpAddress, whitelistUrl, publicKey, privateKey);
    }

    // Remove outdated IPs from the whitelist
    await removeOutdatedIPs(
      existingEntries,
      whitelistUrl,
      now,
      publicKey,
      privateKey,
    );
  } catch (error: any) {
    console.error('Error in whitelistIP function:', error.message);
  }
}

async function fetchCurrentIP(): Promise<string> {
  const { data } = await axios.get('https://api.ipify.org?format=text');
  return data;
}

async function fetchWhitelistEntries(
  url: string,
  publicKey: string,
  privateKey: string,
): Promise<any> {
  return await makeAuthenticatedRequest(url, publicKey, privateKey);
}

function isIPWhitelisted(ip: string, entries: any): boolean {
  return entries.results.some((entry: any) => entry.ipAddress === ip);
}

async function addIPToWhitelist(
  ip: string,
  url: string,
  publicKey: string,
  privateKey: string,
) {
  const now = new Date();
  const formattedDate = now.toISOString();
  const newEntry: WhitelistEntry = {
    ipAddress: ip,
    comment: `Updated by MongoDBAutoIP - ${formattedDate}`,
  };

  await makeAuthenticatedRequest(url, publicKey, privateKey, 'POST', [
    newEntry,
  ]);
  await delay(3000); // Short delay to allow updates
}

async function removeOutdatedIPs(
  entries: any,
  url: string,
  now: Date,
  publicKey: string,
  privateKey: string,
) {
  for (const entry of entries.results) {
    if (entry.comment.startsWith('Updated by MongoDBAutoIP -')) {
      const entryDate = extractDateFromComment(entry.comment);
      if (
        entryDate &&
        entryDate.getTime() + WHITELIST_RETENTION_PERIOD < now.getTime()
      ) {
        const removeUrl = `${url}/${encodeURIComponent(entry.cidrBlock)}`;
        await makeAuthenticatedRequest(
          removeUrl,
          publicKey,
          privateKey,
          'DELETE',
        );
      }
    }
  }
}

function extractDateFromComment(comment: string): Date | null {
  const parts = comment.split(' - ');
  if (parts.length > 1) {
    return new Date(parts[1]);
  }
  return null;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function makeAuthenticatedRequest(
  url: string,
  username: string,
  password: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  data: any = null,
): Promise<any> {
  const digestHeader = await getDigestAuthHeaders(url, username, password);
  const { realm, nonce, qop } = parseDigestHeader(digestHeader);

  const nc = '00000001'; // nonce count
  const cnonce = crypto.randomBytes(24).toString('hex'); // client nonce
  const path = new URL(url).pathname + new URL(url).search;
  const responseHash = createResponseHash(
    username,
    password,
    method,
    path,
    realm,
    nonce,
    qop,
    nc,
    cnonce,
  );

  const authHeader = `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${path}", qop=${qop}, nc=${nc}, cnonce="${cnonce}", response="${responseHash}"`;

  const options: any = {
    method,
    url,
    headers: { Authorization: authHeader },
  };

  if (data && method === 'POST') {
    options.data = data;
    options.headers['Content-Type'] = 'application/json';
  }

  const response = await axios(options);
  return response.data;
}

async function getDigestAuthHeaders(
  url: string,
  username: string,
  password: string,
): Promise<string> {
  try {
    await axios.get(url);
  } catch (error: any) {
    if (error.response?.status === 401) {
      return error.response.headers['www-authenticate'];
    }
    throw error;
  }
}

function parseDigestHeader(digestHeader: string): Record<string, string> {
  const parts = digestHeader.split(', ');
  return parts.reduce((acc: Record<string, string>, part: string) => {
    const [key, value] = part.split('=');
    acc[key] = value.replace(/"/g, '');
    return acc;
  }, {});
}

function createResponseHash(
  username: string,
  password: string,
  method: string,
  path: string,
  realm: string,
  nonce: string,
  qop: string,
  nc: string,
  cnonce: string,
): string {
  const ha1 = crypto
    .createHash('md5')
    .update(`${username}:${realm}:${password}`)
    .digest('hex');
  const ha2 = crypto
    .createHash('md5')
    .update(`${method}:${path}`)
    .digest('hex');
  return crypto
    .createHash('md5')
    .update(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`)
    .digest('hex');
}

export { whitelistIP };
