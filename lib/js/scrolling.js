$(function() {
    $('nav.index-navbar').on('click', 'a.nav-link', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function() {
                window.location.hash = hash;
            })
        }
    })
})