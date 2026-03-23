import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectThreat } from './lib/security';

const RATE_LIMIT_MAP = new Map<string, { count: number; last: number }>();

export function middleware(request: NextRequest) {
  const ip = (request as any).ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  const ua = request.headers.get('user-agent') || '';
  const now = Date.now();

  const rate = RATE_LIMIT_MAP.get(ip) || { count: 0, last: now };
  if (now - rate.last > 60000) {
    rate.count = 0;
    rate.last = now;
  }
  rate.count++;
  RATE_LIMIT_MAP.set(ip, rate);

  if (rate.count > 100) {
    return new NextResponse('Rate limit exceeded', { status: 429 });
  }

  const query = request.nextUrl.search;
  if (query) {
    const { score } = detectThreat(decodeURIComponent(query));
    if (score > 60) {
      return new NextResponse('High risk activity detected', { status: 403 });
    }
  }

  if (/(sqlmap|nikto|nmap|python-requests|curl)/i.test(ua)) {
    return new NextResponse('Tools not allowed', { status: 403 });
  }

  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
