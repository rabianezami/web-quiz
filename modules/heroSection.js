export function renderHeroSection({ title, description, buttonText, buttonLink}) {
    return `
      <section id="hero">
        <div class="container text-center">
           <h1 class="display-1 mt-5 hero-title">
             Ready to <span class="graident-text">test</span> your <br> knowledge?
           </h1>
           <p class="lead-sm text-muted hero-content">${description}</p>
           <a href="${buttonLink}" class="btn px-3 btn-start-quiz">${buttonText}</a>
        </div>
      </section>
    `
}

