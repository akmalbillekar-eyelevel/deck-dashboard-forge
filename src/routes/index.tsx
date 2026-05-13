import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/deck/Deck";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "S For Sport — Investor Memorandum 2026" },
      { name: "description", content: "Six interlocking pickleball investment opportunities. Confidential investor deck for Director Atlee." },
    ],
  }),
});

function Index() {
  return <Deck />;
}
