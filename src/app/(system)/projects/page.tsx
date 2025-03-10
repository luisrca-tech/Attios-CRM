import { ContentSidebar } from "~/features/ContentSidebar";

export default function Projects() {
  return (
    <main className="flex">
      <ContentSidebar.Page.Projects />
      <h2>You are in the projects page</h2>
    </main>
  );
}
