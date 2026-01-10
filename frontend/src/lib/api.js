import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// 인증 상태가 초기화될 때까지 대기하는 헬퍼 함수
function waitForAuth() {
    return new Promise((resolve) => {
        // 3초간 대기하며 인증 상태 확인 (타임아웃 적용)
        const timeout = setTimeout(() => {
            console.warn("waitForAuth: Timeout (3s) reached. Resolving as null.");
            resolve(auth.currentUser);
        }, 3000);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            clearTimeout(timeout);
            unsubscribe();
            console.log("waitForAuth: Auth state changed. User:", user ? user.email : "null");
            resolve(user);
        });
    });
}

async function request(path, options = {}) {
    // 1. 인증 상태 확인 (초기 로딩 등 레이스 컨디션 방지)
    await waitForAuth();

    // 2. 현재 로그인된 사용자 토큰 가져오기 (항상 최신 상태 조회)
    const user = auth.currentUser;
    let token = null;

    if (user) {
        try {
            // forceRefresh: false (기본값)
            token = await user.getIdToken();
            console.log("Requesting", path, "with token for:", user.email);
        } catch (e) {
            console.error("Token fetch failed", e);
        }
    } else {
        console.log("Requesting", path, "as Anonymous (No User)");
    }

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    // 3. 토큰이 있으면 헤더에 추가
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    } else {
        console.warn("API Request without Token:", path);
    }

    const res = await fetch(path, {
        headers,
        ...options,
    });

    if (!res.ok) {
        let reason = `HTTP ${res.status}`;
        try {
            // 403 Forbidden 등 에러 응답 처리
            if (res.status === 403) {
                console.error("Access Denied (403):", path, "Token Present:", !!token);
            }
            const data = await res.json();
            reason = data.reason || data.message || reason;
        } catch (e) { }
        throw new Error(reason);
    }

    if (res.status === 204) return null;
    return res.json();
}

export const api = {
    get: (path) => request(path),
    post: (path, body) =>
        request(path, { method: "POST", body: JSON.stringify(body) }),
    put: (path, body) =>
        request(path, { method: "PUT", body: JSON.stringify(body) }),
    delete: (path) => request(path, { method: "DELETE" }),
};
