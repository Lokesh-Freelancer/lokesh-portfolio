"use client";

import { useRef, useState, useEffect } from "react";
import { email, linkedin, medium, projects, expertise, experience, initialStories, mediumFeedUrl, type MediumStory } from "@/lib/content";

type IconName = "arrow" | "diagonal" | "download" | "mail" | "location" | "close" | "menu" | "copy" | "check" | "code";
function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M4 12h16M14 6l6 6-6 6" /></>,
    diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 17h16" />,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V3H3v13h5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />,
  };
  return <svg className={`icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function ThemeDemo() {
  const [preview, setPreview] = useState(false);
  const [added, setAdded] = useState(false);
  return <div className="theme-demo">
    <div className="editor-top"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>custom-theme / featured-product</span><Icon name="code" /></div>
    <div className="editor-tabs" role="tablist" aria-label="Shopify theme demonstration" onKeyDown={event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? false : event.key === "End" ? true : !preview;
      setPreview(next);
      event.currentTarget.querySelectorAll("button")[next ? 1 : 0].focus();
    }}>
      <button role="tab" id="liquid-tab" tabIndex={preview ? -1 : 0} aria-selected={!preview} aria-controls="theme-panel" onClick={() => setPreview(false)}>Liquid code</button>
      <button role="tab" id="preview-tab" tabIndex={preview ? 0 : -1} aria-selected={preview} aria-controls="theme-panel" onClick={() => setPreview(true)}>Storefront preview <Icon name="diagonal" /></button>
    </div>
    <div id="theme-panel" role="tabpanel" aria-labelledby={preview ? "preview-tab" : "liquid-tab"} tabIndex={0} className="editor-body">
      {preview ? <div className="store-preview"><div className="store-nav">EVERYDAY<span>Designed to feel different.</span></div><div className="store-product"><div className="product-art" aria-hidden="true"><div className="bottle-cap" /><div className="bottle"><span>every<br />day.</span><small>THE DAILY ESSENTIAL</small></div></div><div className="product-description"><h3>The daily<br />essential.</h3><p>Small rituals. Better days.<br />A little simplicity, beautifully delivered.</p><button onClick={() => setAdded(!added)} className="demo-add">{added ? "Remove from demo bag" : "Add to demo bag"} <Icon name={added ? "check" : "arrow"} /></button></div></div><small className="demo-disclaimer" role="status">{added ? "Added to demo bag · illustrative storefront" : "Illustrative storefront · interactive theme demo"}</small></div>
        : <div className="code-content"><div className="code-line"><span>1</span><code><b>{"{% comment %}"}</b></code></div><div className="code-line"><span>2</span><code className="code-comment">A little Liquid. A lot of possibility.</code></div><div className="code-line"><span>3</span><code><b>{"{% endcomment %}"}</b></code></div><div className="code-line empty"><span>4</span></div><div className="code-line"><span>5</span><code><em>{"<section"}</em> class=<strong>"featured-product"</strong><em>{">"}</em></code></div><div className="code-line"><span>6</span><code>{"  "}<em>{"<h2>"}</em><b>{"{{ product.title }}"}</b><em>{"</h2>"}</em></code></div><div className="code-line"><span>7</span><code>{"  "}<em>{"<p>"}</em><b>{"{{ product.price | money }}"}</b><em>{"</p>"}</em></code></div><div className="code-line empty"><span>8</span></div><div className="code-line"><span>9</span><code>{"  "}<b>{"{% if product.available %}"}</b></code></div><div className="code-line"><span>10</span><code>{"    "}<b>{"{% form 'product', product %}"}</b></code></div><div className="code-line"><span>11</span><code>{"      "}<em>{"<button"}</em> type=<strong>"submit"</strong><em>{">"}</em></code></div><div className="code-line"><span>12</span><code>{"        "}Add to bag</code></div><div className="code-line"><span>13</span><code>{"      "}<em>{"</button>"}</em></code></div><div className="code-line"><span>14</span><code>{"    "}<b>{"{% endform %}"}</b></code></div><div className="code-line"><span>15</span><code>{"  "}<b>{"{% endif %}"}</b></code></div><div className="code-line"><span>16</span><code><em>{"</section>"}</em></code></div></div>}
    </div>
    <div className="editor-bottom"><span><i />Shopify Liquid</span><span>Built with purpose.</span></div>
    <div className="demo-note"><span className="shopify-symbol" aria-hidden="true">S</span><div>From code to commerce.<small>Custom themes. Considered experiences.</small></div><Icon name="diagonal" /></div>
  </div>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [stories, setStories] = useState<MediumStory[]>(initialStories);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(mediumFeedUrl)}`)
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => {
        if (!isMounted || !data?.contents) return;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item"));
        if (items.length === 0) return;
        const fetched: MediumStory[] = items.slice(0, 4).map(item => {
          const title = (item.querySelector("title")?.textContent || "").replace(/^<!\[CDATA\[|\]\]>$/g, "");
          const link = (item.querySelector("link")?.textContent || "").split("?")[0];
          const pubDateRaw = item.querySelector("pubDate")?.textContent || "";
          const pubDate = pubDateRaw ? new Date(pubDateRaw).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";
          const categories = Array.from(item.querySelectorAll("category"))
            .map(c => (c.textContent || "").replace(/^<!\[CDATA\[|\]\]>$/g, ""))
            .filter(Boolean)
            .slice(0, 2);
          const rawContent = item.querySelector("encoded")?.textContent || item.querySelector("description")?.textContent || "";
          const snippet = rawContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160) + "...";
          return { title, link, pubDate, categories, snippet };
        });
        if (fetched.length > 0) {
          setStories(fetched);
        }
      })
      .catch(() => {
        // Fallback silently remains active
      });
    return () => {
      isMounted = false;
    };
  }, []);

  function openProject(project: (typeof projects)[number]) {
    setSelectedProject(project);
    dialogRef.current?.showModal();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied to clipboard.");
    } catch {
      setCopyStatus("Copy unavailable. Use the email link to get in touch.");
    }
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setCopyStatus(""), 4500);
  }

  const nav = [
    { label: "Work", id: "work" },
    { label: "Writing", id: "writing" },
    { label: "Expertise", id: "expertise" },
    { label: "Experience", id: "experience" },
    { label: "About", id: "about" },
  ];

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="container header-inner">
      <a href="#" className="wordmark" aria-label="Lokesh Prajapat home">lokesh<span>.</span></a>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="main-navigation" aria-label="Main navigation">{nav.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}<a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Let’s talk <Icon name="diagonal" /></a></nav>
      <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
    </div></header>

    <main id="main">
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-copy"><h1 id="hero-heading">Thoughtful code.<br /><span>Better commerce.</span></h1><p className="hero-intro">I’m <strong>Lokesh Prajapat</strong>, a Senior Shopify Web Developer building stores that look great and work even better.</p><p className="hero-detail">Custom themes. Seamless migrations. Fast storefronts.<br className="desktop-break" /> Bringing brands to life, one thoughtful detail at a time.</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <Icon name="arrow" /></a><a className="resume-link" href="/Lokesh-Resume.pdf" download>Download resume <Icon name="download" /></a></div><div className="hero-location"><Icon name="location" /> Indore, India <span /> Building for brands worldwide</div></div>
        <ThemeDemo />
      </section>

      <div className="container"><div className="proof-strip"><p><strong>4+</strong> years in Shopify development</p><p><strong>50+</strong> stores delivered globally</p><p><strong>30%</strong> less development time with reusable components</p></div></div>

      <section className="work-section container section" id="work" aria-labelledby="work-heading">
        <div className="section-heading"><div><h2 id="work-heading">Selected work<span>.</span></h2><p>A few brands I’ve helped bring to life online.</p></div><div className="filters" aria-label="Filter projects">{["All work", "Shopify", "WordPress"].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <div className="project-grid">{projects.filter(project => filter === "All work" || project.category === filter).map(project => <article className="project" key={project.name}><button className={`project-cover ${project.style}`} aria-label={`View ${project.name} project details`} onClick={() => openProject(project)}><span className="cover-platform">{project.category} / {project.industry}</span><div className="cover-brand">{project.style === "milano" && <span className="milano-mark">m</span>}{project.style === "riders" && <Icon name="code" />}<span>{project.short}</span>{project.style === "milano" && <small>WIGS COLLECTION</small>}{project.style === "proteger" && <small>DAILY</small>}{project.style === "today" && <span className="today-rule" />}{project.style === "inspire" && <small>COMMUNITIES</small>}{project.style === "mywall" && <small>WALLPAPER STUDIO</small>}{project.style === "vitaliving" && <small>HEALTH & WELLNESS</small>}{project.style === "pinkpigs" && <small>GIFTS THAT GIVE BACK</small>}{project.style === "eves" && <small>NEW YORK INTIMATES</small>}{project.style === "littlebones" && <small>PEDIATRIC CLINIC</small>}</div><span className="cover-footer">Illustrative project cover<span className="cover-arrow"><Icon name="diagonal" /></span></span></button><div className="project-title"><h3><button onClick={() => openProject(project)}>{project.name}</button></h3>{project.url ? <a className="project-open" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit live website for ${project.name}`}><Icon name="diagonal" /></a> : <button className="project-open" onClick={() => openProject(project)} aria-label={`Read about ${project.name}`}><Icon name="diagonal" /></button>}</div><p>{project.summary}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><button className="project-details-btn" onClick={() => openProject(project)}>View details</button>{project.url && <a className="project-live-link" href={project.url} target="_blank" rel="noreferrer">Visit live site <Icon name="diagonal" /></a>}</div></article>)}</div>
      </section>

      <section className="writing-section section container" id="writing" aria-labelledby="writing-heading">
        <div className="section-heading">
          <div><h2 id="writing-heading">Writing & stories<span>.</span></h2><p>Engineering insights, Next.js guides, and clean code patterns.</p></div>
          <a className="resume-link" href={medium} target="_blank" rel="noreferrer">All stories on Medium <Icon name="diagonal" /></a>
        </div>
        <div className="stories-grid">
          {stories.map(story => (
            <article className="story-card" key={story.link || story.title}>
              <div className="story-meta">
                <span className="story-date">{story.pubDate}</span>
                <div className="story-tags">
                  {story.categories.map(cat => <span key={cat}>#{cat}</span>)}
                </div>
              </div>
              <h3><a href={story.link} target="_blank" rel="noreferrer">{story.title}</a></h3>
              <p>{story.snippet}</p>
              <a className="story-read" href={story.link} target="_blank" rel="noreferrer">Read on Medium <Icon name="diagonal" /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="expertise-section section" id="expertise" aria-labelledby="expertise-heading"><div className="container expertise-layout"><div className="expertise-intro"><h2 id="expertise-heading">Good design.<br />Solid foundations<span>.</span></h2><p>I connect the details that make a storefront feel effortless—from the first impression to the final interaction.</p><a href="#contact" className="text-link">Let’s build something <Icon name="arrow" /></a></div><div className="expertise-list">{expertise.map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.description}</p><div className="skill-list">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></div></section>

      <section className="experience-section section container" id="experience" aria-labelledby="experience-heading"><div className="section-heading"><div><h2 id="experience-heading">The journey so far<span>.</span></h2><p>Hands-on experience. Real client work. Always learning.</p></div><a className="resume-link" href="/Lokesh-Resume.pdf" download>Full resume <Icon name="download" /></a></div><div className="timeline">{experience.map((job, index) => <article key={job.company} className="experience-entry"><div className="experience-date"><span className={`timeline-dot ${index === 0 ? "current" : ""}`} /><p>{job.dates}</p><small>{job.location}</small></div><div className="experience-content"><h3>{job.role}</h3><p className="company">{job.company}</p><ul>{job.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>)}</div></section>

      <section className="about-section section container" id="about" aria-labelledby="about-heading"><div className="about-art" aria-hidden="true"><span>l<span className="art-period">.</span></span><div>Curiosity in the process.<br />Care in the details.</div></div><div className="about-copy"><h2 id="about-heading">A developer with<br />an eye for the details<span>.</span></h2><p>Hi, I’m Lokesh. Based in Indore, I specialize in turning ideas into polished ecommerce experiences. My work brings together Shopify development, responsive design, and a focus on performance.</p><p>I enjoy solving the small, tricky problems that make a big difference—whether that’s a custom Liquid feature, a smoother product page, or a carefully planned store migration.</p><div className="education"><h3>Education</h3><div><strong>B.Sc. in Mathematics</strong><span>Govt. N.S.P. Science College, Indore</span><small>2018 — 2022</small></div><div><strong>Web Design Certificate</strong><span>Virtual Voyages College, Indore</span><small>2018 — 2019</small></div></div></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="container contact-inner"><div><h2 id="contact-heading">Your next store,<br />built with care<span>.</span></h2><p>Have a project in mind or a role that could be a good fit?<br />Let’s start with a conversation.</p><a href={`mailto:${email}`} className="button button-primary">Get in touch <Icon name="diagonal" /></a></div><div className="contact-details"><span className="contact-label">Say hello</span><div className="email-row"><a href={`mailto:${email}`}>{email}</a><button onClick={copyEmail} aria-label="Copy email address"><Icon name={copyStatus.startsWith("Email copied") ? "check" : "copy"} /></button></div><a className="contact-phone" href="tel:+918120805721">+91 8120 805 721</a><div className="contact-socials"><a className="linkedin-link" href={linkedin} target="_blank" rel="noreferrer">Find me on LinkedIn <Icon name="diagonal" /></a><a className="medium-link" href={medium} target="_blank" rel="noreferrer">Read on Medium <Icon name="diagonal" /></a></div><div className="contact-location"><Icon name="location" /><span>Indore, Madhya Pradesh, India</span></div></div></div></section>
    </main>

    <footer className="site-footer container"><a href="#" className="wordmark">lokesh<span>.</span></a><p>© {new Date().getFullYear()} Lokesh Prajapat</p><a href="#main" className="back-top">Back to top <Icon name="arrow" /></a></footer>
    <div className={`toast ${copyStatus ? "visible" : ""}`} role="status" aria-live="polite">{copyStatus}</div>

    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      {selectedProject && <div className="dialog-inner"><button className="dialog-close" aria-label="Close project details" onClick={() => dialogRef.current?.close()}><Icon name="close" /></button><h2 id="project-dialog-title">{selectedProject.name}</h2><span className="dialog-category">{selectedProject.category} · {selectedProject.industry}</span><p className="dialog-summary">{selectedProject.summary}</p><h3>My contribution</h3><ul>{selectedProject.details.map(detail => <li key={detail}>{detail}</li>)}</ul><div className="project-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="dialog-actions">{selectedProject.url && <a className="button button-primary" href={selectedProject.url} target="_blank" rel="noreferrer">Visit live store <Icon name="diagonal" /></a>}<a className="button button-outline" href={`mailto:${email}?subject=${encodeURIComponent(`Let’s discuss a project like ${selectedProject.name}`)}`}>Discuss a similar project <Icon name="arrow" /></a></div></div>}
    </dialog>
  </>;
}
