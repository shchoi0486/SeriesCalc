"use client";

import { useId, useState } from "react";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ isKo }: { isKo: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botcheck) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMsg(
        isKo
          ? "문의 서비스가 설정되지 않았습니다 (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY)."
          : "Contact service is not configured (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY)."
      );
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", `SeriesCalc 문의: ${name}`);
    formData.append("from_name", "SeriesCalc");
    formData.append("reply_to", email);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("botcheck", botcheck);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.success) {
        setStatus("error");
        setErrorMsg(
          result?.message ||
            (isKo ? "전송에 실패했습니다. 다시 시도해 주세요." : "Failed to send. Please try again.")
        );
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(isKo ? "네트워크 오류가 발생했습니다." : "A network error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-base font-medium text-foreground">
          {isKo
            ? "문의가 정상적으로 전송되었습니다. 확인 후 답변드리겠습니다."
            : "Your message has been sent successfully. We will get back to you soon."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
        >
          {isKo ? "새 문의 작성" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {isKo ? "이름" : "Name"}
          </label>
          <input
            type="text"
            name="name"
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
            name="email"
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
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={isKo ? "문의하실 내용을 입력해 주세요." : "Type your message here."}
          />
        </div>

        <input
          type="checkbox"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          checked={botcheck !== ""}
          onChange={(e) => setBotcheck(e.target.value)}
          aria-hidden="true"
          id={`botcheck-${formId}`}
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending"
            ? isKo
              ? "전송 중..."
              : "Sending..."
            : isKo
              ? "보내기"
              : "Send Message"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-600">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
