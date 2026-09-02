import { useEffect, useMemo, useRef, useState } from 'react';
import PhotographyGallery from './pages/PhotographyGallery.jsx';
import {useNavigate,Link} from 'react-router-dom';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#stories', label: 'Stories' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#planners', label: 'For Planners' },
  { href: '#contact', label: 'Contact' },
];

const portfolioItems = [
  { id: 1, category: 'weddings', size: 'tall', image: '/Images/Wedding1.jpeg', alt: 'Wedding ceremony', label: 'Wedding', title: 'Hampshire' },
  { id: 2, category: 'portraits', size: '', image: '/Images/Potrait2.jpeg', alt: 'Wedding portrait', label: 'Portraits', title: 'Cotswolds' },
  { id: 3, category: 'moments', size: 'wide', image: '/Images/Moments2.jpeg', alt: 'Bride and groom wedding moment', label: 'Moments', title: 'London' },
  { id: 4, category: 'details', size: '', image: '/Images/Details1.jpeg', alt: 'Wedding rings and flowers', label: 'Details', title: 'Surrey' },
  { id: 5, category: 'weddings', size: 'tall', image: '/Images/Moments3.jpeg', alt: 'Wedding reception', label: 'Wedding', title: 'Edinburgh' },
  { id: 6, category: 'moments', size: '', image: '/Images/Moments1.jpeg', alt: 'Wedding couple', label: 'Moments', title: 'Yorkshire' },
  { id: 7, category: 'portraits', size: 'wide', image: '/Images/Potrait1.jpeg', alt: 'Bride portrait', label: 'Portraits', title: 'Lake District' },
  { id: 8, category: 'details', size: '', image: '/Images/Details2.jpeg', alt: 'Wedding flowers', label: 'Details', title: 'Devon' },
];

const instagramImages = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
];

const plannerPoints = [
  { number: '01', text: 'Professional and discreet' },
  { number: '02', text: 'Fast, reliable communication' },
  { number: '03', text: 'Editorial-quality imagery' },
  { number: '04', text: 'UK-wide availability' },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formStatus, setFormStatus] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    const navItems = document.querySelectorAll('.navigation a');

    const updateActiveNavigation = () => {
      let current = '';
      const scrollPosition = window.scrollY + 180;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach((link) => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    const handleAnchorClick = (event) => {
      const link = event.currentTarget;
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      const position = target.offsetTop - headerHeight;

      window.scrollTo({ top: position, behavior: 'smooth' });
    };

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', handleAnchorClick);
    });

    updateActiveNavigation();
    window.addEventListener('scroll', updateActiveNavigation, { passive: true });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.removeEventListener('click', handleAnchorClick);
      });
      window.removeEventListener('scroll', updateActiveNavigation);
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(
      '.section-heading, .service-card, .featured-grid, .about-content, .testimonial-inner'
    );

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal', 'revealed');
              currentObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      revealElements.forEach((element) => {
        element.classList.add('reveal');
        observer.observe(element);
      });

      return () => observer.disconnect();
    }

    revealElements.forEach((element) => element.classList.add('revealed'));
    return undefined;
  }, []);

  const visiblePortfolio = useMemo(
    () =>
      portfolioItems.map((item) => ({
        ...item,
        hidden: activeFilter !== 'all' && item.category !== activeFilter,
      })),
    [activeFilter]
  );

  const visibleImages = useMemo(
    () => visiblePortfolio.filter((item) => !item.hidden),
    [visiblePortfolio]
  );

  const currentImage = visibleImages[lightboxIndex] || visibleImages[0];

  const handleImageError = (event) => {
    event.currentTarget.style.opacity = '0.5';
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      }

      if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % visibleImages.length);
      }

      if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + visibleImages.length) % visibleImages.length);
      }
    };

    document.body.classList.add('lightbox-open');
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.classList.remove('lightbox-open');
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [lightboxOpen, visibleImages]);

  useEffect(() => {
    if (visibleImages.length === 0) {
      setLightboxOpen(false);
      return;
    }

    if (lightboxOpen && lightboxIndex >= visibleImages.length) {
      setLightboxIndex(0);
    }
  }, [lightboxIndex, lightboxOpen, visibleImages]);

  const handleOpenLightbox = (item) => {
  if (!visibleImages.length) return;

  const nextIndex = visibleImages.findIndex(
    (image) => image.id === item.id
  );

  setLightboxIndex(nextIndex >= 0 ? nextIndex : 0);
  setLightboxOpen(true);
};

  const handleCloseLightbox = () => setLightboxOpen(false);

  const handleNextImage = () => {
    if (!visibleImages.length) return;
    setLightboxIndex((prev) => (prev + 1) % visibleImages.length);
  };

  const handlePreviousImage = () => {
    if (!visibleImages.length) return;
    setLightboxIndex((prev) => (prev - 1 + visibleImages.length) % visibleImages.length);
  };

  const handleNavClick = () => setMenuOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const formObject = Object.fromEntries(formData.entries());

    console.log('Wedding enquiry:', formObject);
    setFormStatus('Thank you. Your enquiry has been received.');
    formRef.current.reset();
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#home" className="logo">
            VIPIN WILFRED
            <span>WEDDING PHOTOGRAPHER</span>
          </a>

          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span></span>
            <span></span>
          </button>

          <nav className={`navigation ${menuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleNavClick}>
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="header-cta">
            Enquire
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image"></div>
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <p className="eyebrow">UK &amp; DESTINATION WEDDING PHOTOGRAPHER</p>
            <h1>
              Your story,<br />
              beautifully remembered.
            </h1>
            <p className="hero-description">
              Honest, cinematic wedding photography for couples who want photographs that feel as beautiful as the day itself.
            </p>

            <div className="hero-buttons">
              <a href="#stories" className="button button-light">
                Explore the work
              </a>
              <a href="#contact" className="button button-outline">
                Check availability
              </a>
            </div>
          </div>

          <div className="hero-bottom">
            <span>London · UK · Worldwide</span>
            <span className="scroll-indicator">
              Scroll to explore
              <i></i>
            </span>
          </div>
        </section>

        <section className="intro section">
          <div className="intro-inner">
            <p className="eyebrow dark">THE APPROACH</p>
            <h2 className = "intro-heading">
              Photographs that let you
              <em>relive the feeling.</em>
            </h2>
            <p className="intro-text">
              Your wedding day moves quickly. The laughter, the nervous hands, the tears, the embraces and the people you love most.
            </p>
            <p className="intro-text">
              My approach is unobtrusive and intentional — documenting the moments as they naturally unfold, while creating timeless portraits that belong in your family for generations.
            </p>
          </div>
        </section>

        <section className="featured-story section" id="stories">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark">FEATURED STORY</p>
              <h2>Sophie &amp; James</h2>
            </div>

            <p>
              A summer celebration at
              <span>Hedsor House, Buckinghamshire</span>
            </p>
          </div>

          <div className="featured-grid">
            <div className="featured-large image-card">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                alt="Bride and groom walking together"
                loading="lazy"
              />
            </div>

            <div className="featured-small image-card">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85"
                alt="Wedding couple embracing"
                loading="lazy"
              />
            </div>

            <div className="featured-text">
              <span>01 / 04</span>
              <h3>An intimate summer celebration.</h3>
              <p>
                From the quiet moments before the ceremony to a packed dance floor after sunset, every part of this day was full of warmth, personality and connection.
              </p>
              <Link to="/gallery">
                View full story
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="portfolio section" id="portfolio">
          <div className="section-heading centered">
            <p className="eyebrow dark">SELECTED WORK</p>
            <h2>Recent weddings</h2>
            <p>A collection of celebrations photographed across the UK.</p>
          </div>

          <div className="filters">
            {['all', 'weddings', 'portraits', 'details', 'moments'].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                data-filter={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {visiblePortfolio.map((item) => (
              <article
                key={item.id}
                className={`portfolio-item ${item.size} ${item.hidden ? 'hidden' : ''}`}
                data-category={item.category}
              >
                <img
                 src={item.image}
                 alt={item.alt}
                 loading="lazy"
                 onError={handleImageError}
                 onClick={() => handleOpenLightbox(item)}
                />

                <div className="portfolio-caption">
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-image">
            <img src="/Images/About.JPG" alt="Wedding photographer" loading="lazy" onError={handleImageError} />
          </div>

          <div className="about-content">
            <p className="eyebrow dark">BEHIND THE CAMERA</p>
            <h2>
              Hello, I'm
              <em>Vipin.</em>
            </h2>

            <p>
              My journey with the camera began during my college days, where what started as a curious hobby quickly evolved into a lifelong obsession. Driven by a deep passion for visual storytelling, I made the leap to turn my creative outlet into a full-time profession.
            </p>

            <p>
              Since 2018, I have specialised in capturing Indian weddings—vibrant, fast-paced environments filled with authentic fun, laughter, and love. Documenting these beautiful celebrations taught me how to find the perfect balance between artistic emotion and technical discipline. Managing these high-energy events has given me an expert eye for rich textures, intricate details, and complex lighting setups, alongside a flawless, high-volume editing workflow.
            </p>

            <p>
              Now based in Bournemouth, I am fully equipped with my own professional kit and eager to bring this same energy, stamina, and dedication to local creative studios and commercial brands. Whether capturing a fleeting moment of laughter or crafting crisp, high-end commercial imagery, I strive to bring passion and precision to every single frame.
            </p>

            <a href="#contact" className="text-link">
              More about my approach
              <span>→</span>
            </a>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading centered">
            <p className="eyebrow dark">INVESTMENT</p>
            <h2>Photography for your entire celebration.</h2>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <span className="service-number">01</span>
              <h3>Full Wedding Day</h3>
              <p>
                From preparations through to the final dance. Complete coverage for couples who don't want to miss a thing.
              </p>
              <span className="service-note">From £2,400</span>
            </div>

            <div className="service-card">
              <span className="service-number">02</span>
              <h3>Intimate Weddings</h3>
              <p>
                Thoughtful coverage for smaller celebrations, elopements and intimate gatherings.
              </p>
              <span className="service-note">From £1,600</span>
            </div>

            <div className="service-card">
              <span className="service-number">03</span>
              <h3>Engagement Sessions</h3>
              <p>
                Relaxed portraits before your wedding day — perfect for getting comfortable in front of the camera.
              </p>
              <span className="service-note">From £450</span>
            </div>
          </div>
        </section>

        <section className="planners section" id="planners">
          <div className="planners-inner">
            <p className="eyebrow">FOR PLANNERS &amp; VENUES</p>
            <h2>A photographer your clients can trust.</h2>
            <p>
              I work closely with wedding planners, venues and creative teams to produce beautiful imagery while remaining unobtrusive throughout the day.
            </p>

            <div className="planner-points">
              {plannerPoints.map((point) => (
                <div key={point.number}>
                  <strong>{point.number}</strong>
                  <span>{point.text}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="button button-light">
              Work together
            </a>
          </div>
        </section>

        <section className="testimonial section">
          <div className="testimonial-inner">
            <span className="quote-mark">“</span>
            <blockquote>
              We wanted photographs that felt like us rather than a collection of staged poses. Alex captured every emotion beautifully. Looking through the gallery felt like experiencing our wedding all over again.
            </blockquote>
            <p className="testimonial-name">— Emily &amp; Daniel</p>
            <p className="testimonial-location">The Orangery, London</p>
          </div>
        </section>

        <section className="instagram section">
          <div className="section-heading centered">
            <p className="eyebrow dark">FOLLOW ALONG</p>
            <h2>@vipinwilf</h2>
          </div>

          <div className="instagram-grid">
            {instagramImages.map((image, idx) => (
              <img key={idx} src={image} alt="Wedding photograph" loading="lazy" onError={handleImageError} />
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-intro">
            <p className="eyebrow dark">LET'S CREATE SOMETHING BEAUTIFUL</p>
            <h2>
              Tell me about
              <em>your day.</em>
            </h2>
            <p>
              Dates fill quickly, particularly during the summer months. Get in touch with your wedding date and venue and I'll be in touch with availability and full details.
            </p>

            <div className="contact-details">
              <a href="mailto:hello@evermoreweddings.co.uk">hello@evermoreweddings.co.uk</a>
              <a href="tel:+447700900000">+44 7700 900000</a>
              <span>London · United Kingdom</span>
            </div>
          </div>

          <form ref={formRef} className="contact-form" id="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Your name
                <input type="text" name="name" placeholder="Your name" required />
              </label>

              <label>
                Email address
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
            </div>

            <div className="form-row">
              <label>
                Wedding date
                <input type="date" name="date" required />
              </label>

              <label>
                Wedding venue
                <input type="text" name="venue" placeholder="Venue / Location" />
              </label>
            </div>

            <label>
              Tell me about your wedding
              <textarea name="message" rows="5" placeholder="Tell me a little about your plans..."></textarea>
            </label>

            <button type="submit" className="button button-dark">
              Send enquiry
              <span>→</span>
            </button>

            <p className="form-status" id="form-status">
              {formStatus}
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#home" className="footer-logo">
            VIPIN WILFRED
            <span>WEDDING PHOTOGRAPHER</span>
          </a>

          <p>Timeless photographs. Honest stories.</p>

          <div className="footer-links">
            <a href="#stories">Portfolio</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="https://instagram.com/vipinwilf/" target="_blank" rel="noopener">
              Instagram
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © <span id="current-year">{new Date().getFullYear()}</span>
            Vipin Wilfred Wedding Photographer
          </span>
          <span>London · UK · Worldwide</span>
        </div>
      </footer>

      <div className={`lightbox ${lightboxOpen ? 'active' : ''}`} id="lightbox" aria-hidden={!lightboxOpen}>
        <button type="button" className="lightbox-close" aria-label="Close image" onClick={handleCloseLightbox}>
          ×
        </button>

        <button type="button" className="lightbox-prev" aria-label="Previous image" onClick={handlePreviousImage}>
          ‹
        </button>

        {currentImage && (
            <img className="lightbox-image" src={currentImage.image} alt={currentImage.alt} onError={handleImageError} />
          )}
        <button type="button" className="lightbox-next" aria-label="Next image" onClick={handleNextImage}>
          ›
        </button>
      </div>
    </>
  );
}

export default App;
