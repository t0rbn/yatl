import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // DONE [by to-done]: add a next.js proxy function that implements basic auth check; accept any and passwort = "password"
    // Implemented: parses `Authorization: Basic ...`, decodes via `atob`, splits on the first `:` (so passwords with colons survive), accepts any username when password === "password". Missing/invalid/malformed → 401 + `WWW-Authenticate: Basic realm="Secure Area"`. `config.matcher` excludes `_next/static`, `_next/image`, and favicon.
    const authHeader = request.headers.get('authorization')

    if (authHeader?.startsWith('Basic ')) {
        try {
            const decoded = atob(authHeader.slice(6))
            const separatorIndex = decoded.indexOf(':')
            if (separatorIndex !== -1) {
                const password = decoded.slice(separatorIndex + 1)
                if (password === 'password') {
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
