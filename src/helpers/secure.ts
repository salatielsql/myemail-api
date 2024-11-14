export class Secure {
  static async hashPassword(password: string) {
    const passwordEnconded = new TextEncoder().encode(password);

    const digest = await crypto.subtle.digest(
      { name: "SHA-256" },
      passwordEnconded
    );

    const hexString = [...new Uint8Array(digest)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return hexString;
  }

  static generateUUID() {
    return crypto.randomUUID();
  }
}
