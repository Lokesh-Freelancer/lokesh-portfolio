"use client";

import { useRef, useState, useEffect } from "react";
import { email, phone, phoneFormatted, whatsappUrl, linkedin, medium, projects, expertise, experience, initialStories, mediumFeedUrl, reviews, faqs, type MediumStory, type Review, type FAQItem } from "@/lib/content";
import { ProjectInquiryForm } from "./inquiry-form";

type IconName = "arrow" | "diagonal" | "download" | "mail" | "location" | "close" | "menu" | "copy" | "check" | "code" | "star" | "plus" | "minus" | "whatsapp";
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
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" stroke="none" />,
  };
  return <svg className={`icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function RatingStars({ count = 5 }: { count?: number }) {
  return (
    <div className="rating-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="star-icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
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
  const [reviewFilter, setReviewFilter] = useState("All reviews");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [stories, setStories] = useState<MediumStory[]>(initialStories);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    fetch(`/api/medium/?_t=${Date.now()}`, { cache: "no-store", signal: controller.signal })
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then((data: MediumStory[]) => {
        if (!isMounted || !Array.isArray(data) || data.length === 0) return;
        setStories(data);
      })
      .catch(() => {
        // Fallback to pre-built initialStories remains active seamlessly
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
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
    { label: "Reviews", id: "reviews" },
    { label: "Writing", id: "writing" },
    { label: "Expertise", id: "expertise" },
    { label: "Experience", id: "experience" },
    { label: "About", id: "about" },
    { label: "FAQ", id: "faq" },
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

      <div className="container">
        <div className="proof-strip" aria-label="Key delivery metrics and business impact">
          <div className="proof-item">
            <strong>30+</strong>
            <span>Stores launched &amp; scaled</span>
          </div>
          <div className="proof-item">
            <strong>90+</strong>
            <span>Average mobile PageSpeed</span>
          </div>
          <div className="proof-item">
            <strong>100%</strong>
            <span>On-time milestone delivery</span>
          </div>
          <div className="proof-item">
            <strong>$0</strong>
            <span>Surprise invoices &middot; Fixed scope</span>
          </div>
        </div>
      </div>

      <section className="work-section container section" id="work" aria-labelledby="work-heading">
        <div className="section-heading"><div><h2 id="work-heading">Selected work<span>.</span></h2><p>A few brands I’ve helped bring to life online.</p></div><div className="filters" aria-label="Filter projects">{["All work", "Shopify", "WordPress"].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <div className="project-grid">
          {projects
            .filter(project => filter === "All work" || project.category === filter)
            .map(project => (
              <article className="project" key={project.name}>
                <button
                  className={`project-cover ${project.style} ${project.image ? "has-image" : ""}`}
                  aria-label={`View ${project.name} project details`}
                  onClick={() => openProject(project)}
                >
                  {project.image ? (
                    <div className="project-cover-media">
                      <img
                        src={project.image}
                        alt={`${project.name} storefront`}
                        loading="lazy"
                        className="project-cover-img"
                      />
                      <div className="project-cover-overlay">
                        <span className="cover-platform">{project.category} / {project.industry}</span>
                        <span className="cover-footer">
                          <span>View case study</span>
                          <span className="cover-arrow"><Icon name="diagonal" /></span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="cover-platform">{project.category} / {project.industry}</span>
                      <div className="cover-brand">
                        {project.style === "milano" && <span className="milano-mark">m</span>}
                        {project.style === "riders" && <Icon name="code" />}
                        <span>{project.short}</span>
                        {project.style === "milano" && <small>WIGS COLLECTION</small>}
                        {project.style === "proteger" && <small>DAILY</small>}
                        {project.style === "today" && <span className="today-rule" />}
                        {project.style === "inspire" && <small>COMMUNITIES</small>}
                        {project.style === "mywall" && <small>WALLPAPER STUDIO</small>}
                        {project.style === "vitaliving" && <small>HEALTH & WELLNESS</small>}
                        {project.style === "pinkpigs" && <small>GIFTS THAT GIVE BACK</small>}
                        {project.style === "eves" && <small>NEW YORK INTIMATES</small>}
                        {project.style === "littlebones" && <small>PEDIATRIC CLINIC</small>}
                      </div>
                      <span className="cover-footer">
                        Illustrative project cover
                        <span className="cover-arrow"><Icon name="diagonal" /></span>
                      </span>
                    </>
                  )}
                </button>
                <div className="project-metric-row">
                  <span className="project-metric-pill">
                    <span className="metric-dot" aria-hidden="true" />
                    <span>{project.metric}</span>
                  </span>
                </div>
                <div className="project-title">
                  <h3>
                    <button onClick={() => openProject(project)}>{project.name}</button>
                  </h3>
                  {project.url ? (
                    <a className="project-open" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit live website for ${project.name}`}>
                      <Icon name="diagonal" />
                    </a>
                  ) : (
                    <button className="project-open" onClick={() => openProject(project)} aria-label={`Read about ${project.name}`}>
                      <Icon name="diagonal" />
                    </button>
                  )}
                </div>
                <p>{project.summary}</p>
                <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <div className="project-actions">
                  <button className="project-details-btn" onClick={() => openProject(project)}>View details</button>
                  {project.url && <a className="project-live-link" href={project.url} target="_blank" rel="noreferrer">Visit live site <Icon name="diagonal" /></a>}
                </div>
              </article>
            ))}
        </div>
      </section>


      <section className="reviews-section section container" id="reviews" aria-labelledby="reviews-heading">
        <div className="section-heading">
          <div>
            <div className="trust-pill">
              <span className="trust-dot" aria-hidden="true" />
              <span>Verified Client Feedback · 5.0 Rating</span>
            </div>
            <h2 id="reviews-heading">Client reviews<span>.</span></h2>
            <p>Direct experiences from store owners, founders, and ecommerce leaders.</p>
          </div>
          <div className="filters" aria-label="Filter client reviews">
            {["All reviews", "Shopify", "WordPress"].map(item => (
              <button
                key={item}
                aria-pressed={reviewFilter === item}
                onClick={() => setReviewFilter(item)}
              >
                {item}
                <span className="filter-count">
                  {item === "All reviews"
                    ? ` (${reviews.length})`
                    : ` (${reviews.filter(r => r.category === item).length})`}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="reviews-grid">
          {reviews
            .filter(r => reviewFilter === "All reviews" || r.category === reviewFilter)
            .map(rev => (
              <article className="review-card" key={rev.id}>
                <div className="review-card-top">
                  <RatingStars count={rev.rating} />
                  <span className="review-store-badge">{rev.projectShort}</span>
                </div>
                <blockquote className="review-quote">
                  <p>“{rev.quote}”</p>
                </blockquote>
                <div className="review-author">
                  <div className="author-avatar">{rev.initials}</div>
                  <div className="author-info">
                    <h4>{rev.clientName}</h4>
                    <p className="author-role">{rev.role} · <span>{rev.company}</span></p>
                    <small className="author-location">{rev.location}</small>
                  </div>
                </div>
                <div className="review-card-footer">
                  <span className="review-tag">{rev.tag}</span>
                  <span className="review-platform-pill">{rev.category}</span>
                </div>
              </article>
            ))}
        </div>
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

      <section className="faq-section section container" id="faq" aria-labelledby="faq-heading">
        <div className="section-heading">
          <div>
            <div className="trust-pill">
              <span className="trust-dot" aria-hidden="true" />
              <span>Got Questions? · Transparent Process</span>
            </div>
            <h2 id="faq-heading">Frequently asked questions<span>.</span></h2>
            <p>Everything you need to know about working together, timelines, and store migrations.</p>
          </div>
          <a href="#contact" className="resume-link">Have another question? Let’s talk <Icon name="arrow" /></a>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                className={`faq-card ${isOpen ? "is-open" : ""}`}
                key={faq.question}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    <Icon name={isOpen ? "minus" : "plus"} />
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer-wrapper"
                  style={{ display: isOpen ? "block" : "none" }}
                  role="region"
                >
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <div className="container contact-inner">
          <div className="contact-info-col">
            <div className="trust-pill">
              <span className="trust-dot" aria-hidden="true" />
              <span>Let’s Talk · 24h Response Time</span>
            </div>
            <h2 id="contact-heading">Your next store,<br />built with care<span>.</span></h2>
            <p>
              Have a project in mind, an existing store that needs custom Liquid optimization, or a role to discuss? Send a quick brief or reach out directly.
            </p>

            <div className="contact-actions">
              <a href={`mailto:${email}`} className="button button-outline">
                Direct Email <Icon name="diagonal" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-whatsapp">
                <Icon name="whatsapp" /> Chat on WhatsApp
              </a>
            </div>

            <div className="contact-details">
              <span className="contact-label">Direct reach</span>
              <div className="email-row">
                <a href={`mailto:${email}`}>{email}</a>
                <button onClick={copyEmail} aria-label="Copy email address">
                  <Icon name={copyStatus.startsWith("Email copied") ? "check" : "copy"} />
                </button>
              </div>
              <div className="contact-phone-group">
                <a className="contact-phone" href={`tel:${phone}`}>{phoneFormatted}</a>
                <span className="contact-divider" aria-hidden="true">·</span>
                <a className="contact-whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" /> Direct WhatsApp
                </a>
              </div>
              <div className="contact-socials">
                <a className="linkedin-link" href={linkedin} target="_blank" rel="noreferrer">
                  Find me on LinkedIn <Icon name="diagonal" />
                </a>
                <a className="medium-link" href={medium} target="_blank" rel="noreferrer">
                  Read on Medium <Icon name="diagonal" />
                </a>
              </div>
              <div className="contact-location">
                <Icon name="location" />
                <span>Indore, Madhya Pradesh, India 🇮🇳 (Global Overlap)</span>
              </div>
            </div>
          </div>

          <div className="contact-form-col">
            <ProjectInquiryForm />
          </div>
        </div>
      </section>

    </main>

    <footer className="site-footer container"><a href="#" className="wordmark">lokesh<span>.</span></a><p>© {new Date().getFullYear()} Lokesh Prajapat</p><a href="#main" className="back-top">Back to top <Icon name="arrow" /></a></footer>
    <div className={`toast ${copyStatus ? "visible" : ""}`} role="status" aria-live="polite">{copyStatus}</div>

    {/* Floating WhatsApp Quick Action */}
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
      aria-label="Chat directly on WhatsApp with Lokesh Prajapat"
    >
      <span className="floating-whatsapp-pulse" aria-hidden="true" />
      <Icon name="whatsapp" />
      <span className="floating-whatsapp-label">Chat on WhatsApp</span>
    </a>

    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      {selectedProject && (
        <div className="dialog-inner">
          <button className="dialog-close" aria-label="Close project details" onClick={() => dialogRef.current?.close()}>
            <Icon name="close" />
          </button>
          {selectedProject.image && (
            <div className="dialog-cover-media">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.name} live store`}
                className="dialog-cover-img"
              />
            </div>
          )}
          {selectedProject.metric && (
            <div className="dialog-metric-pill">
              <span className="metric-dot" aria-hidden="true" />
              <span>Key Result: <strong>{selectedProject.metric}</strong></span>
            </div>
          )}
          <h2 id="project-dialog-title">{selectedProject.name}</h2>
          <span className="dialog-category">{selectedProject.category} · {selectedProject.industry}</span>
          <p className="dialog-summary">{selectedProject.summary}</p>
          <h3>My contribution</h3>
          <ul>
            {selectedProject.details.map(detail => <li key={detail}>{detail}</li>)}
          </ul>
          <div className="project-tags">
            {selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}
          </div>
          <div className="dialog-actions">
            {selectedProject.url && (
              <a className="button button-primary" href={selectedProject.url} target="_blank" rel="noreferrer">
                Visit live store <Icon name="diagonal" />
              </a>
            )}
            <a
              className="button button-whatsapp"
              href={`https://wa.me/918120805721?text=${encodeURIComponent(`Hi Lokesh, I saw your work on ${selectedProject.name} and would like to discuss a similar Shopify project.`)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="whatsapp" /> Discuss on WhatsApp
            </a>
            <a
              className="button button-outline"
              href={`mailto:${email}?subject=${encodeURIComponent(`Let’s discuss a project like ${selectedProject.name}`)}`}
            >
              Email inquiry <Icon name="arrow" />
            </a>
          </div>
        </div>
      )}
    </dialog>

  </>;
}
