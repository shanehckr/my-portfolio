import { useEffect, useRef } from 'react';

function CursedCursor() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;
        let animationFrame;

        const particles = [];
        const trail = [];

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;

            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);

        function handleMouseMove(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;

            trail.push({
                x: mouseX,
                y: mouseY,
                life: 1
            });

            if (trail.length > 35) {
                trail.shift();
            }

            for (let i = 0; i < 4; i++) {
                particles.push({
                    x: mouseX + (Math.random() - 0.5) * 14,
                    y: mouseY + (Math.random() - 0.5) * 14,
                    size: Math.random() * 2.2 + 0.6,
                    life: 1,
                    decay: Math.random() * 0.025 + 0.015,
                    vx: (Math.random() - 0.5) * 2.2,
                    vy: (Math.random() - 0.5) * 2.2
                });
            }
        }

        window.addEventListener('mousemove', handleMouseMove);

        function draw() {
            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            currentX += (mouseX - currentX) * 0.2;
            currentY += (mouseY - currentY) * 0.2;

            updateTrail();
            drawTrail();
            updateParticles();
            drawParticles();
            drawCursor();

            animationFrame = requestAnimationFrame(draw);
        }

        function updateTrail() {
            for (let i = trail.length - 1; i >= 0; i--) {
                trail[i].life -= 0.025;

                if (trail[i].life <= 0) {
                    trail.splice(i, 1);
                }
            }
        }

        function drawTrail() {
            if (trail.length < 2) {
                return;
            }

            ctx.save();

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (let i = 1; i < trail.length; i++) {
                const previous = trail[i - 1];
                const point = trail[i];

                const progress = i / trail.length;

                const alpha =
                    point.life *
                    progress *
                    0.85;

                const width =
                    0.6 +
                    progress * 2.8;

                ctx.beginPath();

                ctx.moveTo(
                    previous.x,
                    previous.y
                );

                ctx.lineTo(
                    point.x,
                    point.y
                );

                ctx.strokeStyle = `rgba(
                    255,
                    15,
                    25,
                    ${alpha}
                )`;

                ctx.lineWidth = width;

                ctx.shadowColor =
                    'rgba(255, 0, 20, 0.9)';

                ctx.shadowBlur =
                    12 * progress;

                ctx.stroke();
            }

            ctx.restore();

            drawEnergyStrands();
        }

        function drawEnergyStrands() {
            if (trail.length < 5) {
                return;
            }

            ctx.save();

            ctx.lineCap = 'round';

            for (let strand = 0; strand < 3; strand++) {
                ctx.beginPath();

                for (
                    let i = 0;
                    i < trail.length;
                    i += 2
                ) {
                    const point = trail[i];

                    const angle =
                        i * 0.7 +
                        strand * 2;

                    const offset =
                        Math.sin(angle) *
                        (3 + strand * 2);

                    const x =
                        point.x +
                        offset;

                    const y =
                        point.y +
                        Math.cos(angle) *
                            (3 + strand * 2);

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.strokeStyle =
                    `rgba(255, 25, 35, ${
                        0.25 -
                        strand * 0.05
                    })`;

                ctx.lineWidth =
                    0.7 + strand * 0.25;

                ctx.shadowColor =
                    'rgba(255, 0, 20, 0.8)';

                ctx.shadowBlur = 7;

                ctx.stroke();
            }

            ctx.restore();
        }

        function updateParticles() {
            for (
                let i = particles.length - 1;
                i >= 0;
                i--
            ) {
                const particle = particles[i];

                particle.x += particle.vx;
                particle.y += particle.vy;

                particle.vx *= 0.97;
                particle.vy *= 0.97;

                particle.life -= particle.decay;
                particle.size *= 0.982;

                if (particle.life <= 0) {
                    particles.splice(i, 1);
                }
            }
        }

        function drawParticles() {
            ctx.save();

            for (const particle of particles) {
                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(
                        255,
                        25,
                        35,
                        ${particle.life}
                    )`;

                ctx.shadowColor =
                    'rgba(255, 0, 20, 1)';

                ctx.shadowBlur = 10;

                ctx.fill();
            }

            ctx.restore();
        }

        function drawCursor() {
            const x = mouseX;
            const y = mouseY;

            ctx.save();

            ctx.translate(x, y);

            ctx.beginPath();

            ctx.moveTo(0, 0);
            ctx.lineTo(0, 24);
            ctx.lineTo(6.5, 18);
            ctx.lineTo(12.5, 29);
            ctx.lineTo(17, 26.5);
            ctx.lineTo(11, 16);
            ctx.lineTo(21, 16);
            ctx.closePath();

            ctx.shadowColor =
                'rgba(255, 0, 20, 1)';

            ctx.shadowBlur = 8;

            ctx.fillStyle = '#ffffff';

            ctx.fill();

            ctx.shadowBlur = 0;

            ctx.strokeStyle =
                'rgba(0, 0, 0, 0.95)';

            ctx.lineWidth = 1.4;
            ctx.lineJoin = 'round';

            ctx.stroke();

            ctx.restore();
        }

        draw();

        return () => {
            window.removeEventListener(
                'resize',
                resizeCanvas
            );

            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );

            cancelAnimationFrame(
                animationFrame
            );
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="cursed-cursor"
            aria-hidden="true"
        />
    );
}

export default CursedCursor;