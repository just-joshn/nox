import net from "node:net";

function isLoopback(host) {
	return host === "localhost" || host === "::1" || (net.isIP(host) === 4 && host.startsWith("127."));
}

function blocked() {
	throw new Error("offline test blocked external network");
}

const originalFetch = globalThis.fetch;
globalThis.fetch = function offlineFetch(input, init) {
	const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
	if (!isLoopback(url.hostname)) return Promise.reject(new Error("offline test blocked external network"));
	return originalFetch(input, init);
};

const originalConnect = net.Socket.prototype.connect;
net.Socket.prototype.connect = function offlineConnect(...args) {
	const parts = Array.isArray(args[0]) ? args[0] : args;
	const first = parts[0];
	if (typeof first === "string" || first?.path) return originalConnect.apply(this, args);
	const host = typeof first === "object" ? first?.host ?? first?.hostname : parts[1];
	if (!isLoopback(host ?? "localhost")) blocked();
	return originalConnect.apply(this, args);
};
