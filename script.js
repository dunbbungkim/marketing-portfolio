document.addEventListener("DOMContentLoaded", function() {
    // 1. 스크롤 페이드인 효과
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 한 번만 실행되도록 관찰 해제
            }
        });
    }, {
        threshold: 0.1 // 요소가 10% 화면에 보일 때 실행
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 2. 포트폴리오 성과 그래프 차오르는 효과
    const graphBars = document.querySelectorAll('.after-bar');

    const graphObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetHeight = bar.getAttribute('data-target');
                
                // CSS transition을 통해 서서히 차오름
                bar.style.height = targetHeight;
                bar.classList.add('animate'); // 숫자(텍스트) 나타나는 클래스 추가
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5 // 그래프 영역이 50% 이상 보일 때 극적으로 실행
    });

    graphBars.forEach(bar => graphObserver.observe(bar));

    // 3. 네비게이션 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});