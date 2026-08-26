"use client";

import { useState } from "react";

export default function ContactForm({ isKo }: { isKo: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  const to = "contact@allincalc.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      isKo ? `AllinCalc 문의: ${name || "무제"}` : `AllinCalc Inquiry: ${name || "No subject"}`
    );
    const body = encodeURIComponent(
      `${message}\n\n--\n${name} (${email})`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {isKo ? "이름" : "Name"}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={isKo ? "홍길동" : "Jane Doe"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {isKo ? "이메일" : "Email"}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {isKo ? "문의 내용" : "Message"}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={isKo ? "문의하실 내용을 입력해 주세요." : "Type your message here."}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {isKo ? "이메일로 보내기" : "Send via Email"}
        </button>
        {opened && (
          <p className="text-sm text-muted-foreground">
            {isKo
              ? "메일 프로그램이 열리지 않는다면 아래 이메일로 직접 보내 주세요."
              : "If your mail app did not open, please email us directly at the address below."}
          </p>
        )}
      </form>
    </div>
  );
}
