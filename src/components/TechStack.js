import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Matter from 'matter-js';
import content from '../content.json';

const IconComponent = ({ name, className }) => {
  const Icon = LucideIcons[name];
  if (!Icon) return <LucideIcons.Settings className={className} />;
  return <Icon className={className} strokeWidth={1.5} />;
};

const TechStack = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const boxRefs = useRef([]);
  // Use framer-motion's useInView to trigger animation only when scrolled to
  const isInView = useInView(sceneRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !sceneRef.current) return;

    // Reset boxRefs array length
    boxRefs.current = boxRefs.current.slice(0, content.techStack.length);

    // Matter.js Module Aliases
    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Set realistic sharp gravity (less floaty)
    world.gravity.y = 1.2;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const isMobile = window.innerWidth < 768;
    // Shrink outer box tightly on mobile so it wraps the content without massive halos
    const boxWidth = isMobile ? 80 : 140;
    const boxHeight = isMobile ? 80 : 130;

    // Create physics bodies
    const bodies = content.techStack.map((tech, i) => {
      // Clustered X spawn to ensure dramatic collisions and scatter on drop
      const startX = width / 2 + (Math.random() * 200 - 100);
      return Bodies.rectangle(
        startX,
        -(i * 40) - 150,
        boxWidth,
        boxHeight,
        {
          restitution: 0.3, // Solid rigid hits
          friction: 0.8, // Heavy surface grasping
          frictionAir: 0.005, // Normal atmospheric resistance
          density: 0.02,
          chamfer: { radius: 16 }, // Maps visually to rounded-2xl
          render: { visible: false } // We use React DOM instead
        }
      );
    });

    // Add boundaries (walls and floor)
    // Thicker boundaries prevent high-velocity clipping
    // Walls are impossibly tall so boxes thrown incredibly high into the air cannot cross over them laterally
    const floor = Bodies.rectangle(width / 2, height + 100, width * 2, 200, { isStatic: true });
    const wallLeft = Bodies.rectangle(-100, 0, 200, height * 10, { isStatic: true });
    const wallRight = Bodies.rectangle(width + 100, 0, 200, height * 10, { isStatic: true });

    World.add(world, [...bodies, floor, wallLeft, wallRight]);

    // Add mouse control
    const mouse = Mouse.create(sceneRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    // CRITICAL: Prevent mouse scrolling over to be captured by matter.js
    const mouseEl = mouseConstraint.mouse.element;
    mouseEl.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    // For desktop scrolling to work perfectly over the canvas:
    mouseEl.removeEventListener("wheel", mouseConstraint.mouse.mousewheel); // Essential for modern desktop

    World.add(world, mouseConstraint);

    // Run the engine
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Provide DOM syncer functionality on internal physics ticks
    Matter.Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body, i) => {
        // Failsafe "Killplane": if you throw them so hard they teleport through physics barriers, reset them instantly safely above viewport
        if (body.position.y > height * 2 || body.position.x < -500 || body.position.x > width + 500) {
          Matter.Body.setPosition(body, { x: width / 2, y: -200 });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
        }

        if (boxRefs.current[i]) {
          const el = boxRefs.current[i];
          // Transform strictly tracks body centers + rotations calculated natively by the browser C++ GPU
          el.style.transform = `translate(${body.position.x - boxWidth / 2}px, ${body.position.y - boxHeight / 2}px) rotate(${body.angle}rad)`;
        }
      });
    });

    // Responsive resize handler (Reposition Static Boundaries)
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      Matter.Body.setPosition(floor, { x: newWidth / 2, y: newHeight + 100 });
      Matter.Body.setPosition(wallRight, { x: newWidth + 100, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Runner.stop(runnerRef.current);
      Engine.clear(engineRef.current);
      World.clear(world);
    };
  }, [isInView]);

  return (
    <section id="tech" className="py-24 relative overflow-hidden bg-slate-950/80 border-y border-emerald-500/10 backdrop-blur-3xl">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10 mb-8 text-center pointer-events-none">
        {/* <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm mb-4 block animate-pulse">Interactive Area</span> */}
        <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
          Our <span className="text-gradient">Tech Stack</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto font-light">
          We leverage industry-leading technologies to build scalable, secure, and high-performance solutions. Go ahead, play with the falling blocks!
        </p>
      </div>

      <div
        ref={sceneRef}
        className="w-full h-[600px] relative max-w-6xl mx-auto overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing border border-white/5 bg-black/40 shadow-inner pointer-events-none md:pointer-events-auto"
      >
        {content.techStack.map((tech, index) => (
          <div
            key={tech.name}
            ref={(el) => (boxRefs.current[index] = el)}
            // CRITICAL: "!transition-colors" stops CSS from overriding and smoothing out the 60fps Matter.js transform updates.
            className="absolute top-0 left-0 w-[80px] h-[80px] md:w-[140px] md:h-[130px] glass-card rounded-[12px] md:rounded-2xl flex flex-col items-center justify-center p-1 md:p-4 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] select-none hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] !transition-colors !duration-300 pointer-events-auto cursor-grab active:cursor-grabbing"
            // Hide way out of bounds securely until Engine boots and takes absolute control
            style={{ transform: 'translate(-2000px, -2000px)', touchAction: 'none' }} 
          >
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center mb-1 md:mb-3 pointer-events-none shadow-inner">
              <IconComponent name={tech.icon} className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" />
            </div>
            <h4 className="text-[9px] md:text-xs font-semibold text-white font-poppins text-center pointer-events-none break-words min-w-0 max-w-full leading-tight">
              {tech.name}
            </h4>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-[10px] sm:text-xs tracking-widest uppercase font-doto pointer-events-none flex flex-col items-center gap-2 group cursor-default">
          {/* <LucideIcons.MousePointer2 size={16} className="animate-bounce text-main-secondary opacity-70" /> */}
          {/* <span className="text-center group-hover:text-main-secondary transition-colors duration-300">Engine Driven • Drag The Blocks</span> */}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
