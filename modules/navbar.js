export function renderNavbar() {
    const links = [
        {name: "Home", href: "#", active: true},
        {name: "Categories", href: "#"},
        {name: "Leaderboard", href: "#"},
        {name: "AI Assistant", href: "aiAssistant.html"},
        {name: "About", href: "#"}
    ];

    const navItems = links
    .map(link => `
        <li class="nav-item">
          <a class="nav-link ${link.active ? "active" : ""}" href="${link.href}">
            ${link.name}
          </a>
        </li>
    `).join("");

    return `
    <nav class="navbar py-3">
       <div class="container-fluid d-flex align-items-center text-center">

        <div class="d-flex align-items-center d-lg-none">
           <button class="navbar-toggler border-0 me-2" type="button" 
             data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" 
             aria-controls="offcanvasMenu"
             aria-labelledby="offcanvasMenuLabel">
             <span class="navbar-toggler-icon"></span>
            </button>

            <a class="navbar-brand fw-bold fs-2 ms-0">CodeQuize</a>
        </div>

        <a class="navbar-brand fw-bold fs-2 d-none d-lg-block">CodeQuize</a>

        <ul class="navbar-nav d-none d-lg-flex flex-row mx-auto gap-3 justify-content-center position-absolute start-50 translate-middle-x">
          ${navItems}
        </ul>
       </div>
     </nav> 

     <div class="offcanvas offcanvas-start p-3" tabindex="-1" id="offcanvasMenu" aria-labelledy="offcanvasMenuLabel">
       <div class="offcanvas-header">
         <button type="button" class="btn-close text-reset mt-4" data-bs-dismiss="offcanvas" aria-label="close"></button>
       </div>
       <div class="offcanvas-body fs-5 ">
         <ul class="navbar-nav">
           ${navItems}
         </ul>
       </div>
     </div>
    `;
}
