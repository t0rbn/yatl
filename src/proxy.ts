import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    if (authHeader?.startsWith('Basic ')) {
        try {
            const decoded = atob(authHeader.slice(6))
            const separatorIndex = decoded.indexOf(':')
            if (separatorIndex !== -1) {
                const password = decoded.slice(separatorIndex + 1)
                if (password === process.env.BASIC_AUTH_PASSWORD) {
                    return NextResponse.next()
                }
            }
        } catch {
            // fall through to 401 on malformed base64
        }
    }

    return new NextResponse(null, {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    })
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
