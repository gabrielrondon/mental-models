import { AUTHOR_URL, LICENSE_URL, REPO_URL, TUTURAMA_URL } from "@/lib/links";
import { Mark } from "./nav";

export function Footer({ builtAt }: { builtAt: string }) {
  return (
    <footer className="hairline">
      <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Mark />
          <div>
            <div className="text-[14.5px] font-medium">A Tuturama Open Source Initiative</div>
            <div className="text-[12.5px] text-dim">Built from the Markdown in the repo. Library snapshot {builtAt}.</div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-dim" aria-label="Footer">
          <a className="hover:text-text" href={REPO_URL} target="_blank" rel="noopener">GitHub</a>
          <a className="hover:text-text" href={LICENSE_URL} target="_blank" rel="noopener">MIT license</a>
          <a className="hover:text-text" href={AUTHOR_URL} target="_blank" rel="noopener">Gabriel Rondon</a>
          <a className="hover:text-text" href={TUTURAMA_URL} target="_blank" rel="noopener">tuturama.com</a>
        </nav>
      </div>
    </footer>
  );
}
