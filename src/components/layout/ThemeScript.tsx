export function ThemeScript() {
  const script = `(function(){try{var k="portfolio-theme",t=localStorage.getItem(k),d=document.documentElement;if(t==="light"||t==="dark"){d.dataset.theme=t;d.style.colorScheme=t;return}var m=window.matchMedia("(prefers-color-scheme: light)").matches;d.dataset.theme=m?"light":"dark";d.style.colorScheme=m?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
