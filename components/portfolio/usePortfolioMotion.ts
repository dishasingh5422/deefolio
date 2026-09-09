'use client';

import { type RefObject, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type RootRef = RefObject<HTMLDivElement | null>;

const scrub = 0.72;

export function usePortfolioMotion(root: RootRef) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rootElement = root.current;
    if (!rootElement) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      const hero = rootElement.querySelector<HTMLElement>('#hero');
      const heroLines = gsap.utils.toArray<HTMLElement>('.hero-line', hero ?? undefined);

      if (window.scrollY < 8) {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(heroLines[0], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.72 })
          .fromTo(heroLines[1], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.72 }, '-=0.48');
      }

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hero,
          start: '45% top',
          end: 'bottom top',
          scrub,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse',
        },
      }).fromTo(
        heroLines,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40, stagger: 0.035, duration: 1, immediateRender: false },
      );

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(
          '#about .about-piece',
          { opacity: 0.14, y: 38 },
          { opacity: 1, y: 0, stagger: 0.025, duration: 0.28 },
        )
        .to('#about .about-piece', { opacity: 1, y: 0, duration: 0.46 })
        .to('#about .about-piece', { opacity: 0, y: -46, stagger: 0.018, duration: 0.26 });

      gsap.utils.toArray<HTMLElement>('[data-visual-scene]').forEach((scene, index) => {
        const composition = scene.querySelector<HTMLElement>('[data-visual-composition]');
        const mark = scene.querySelector<HTMLElement>('.visual-mark');
        const activeRotation = [-7, 4, -3][index] ?? 0;

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: scene,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
            invalidateOnRefresh: true,
            toggleActions: 'play none none reverse',
          },
        });

        timeline
          .fromTo(
            composition,
            { opacity: 0.1, y: 42, scale: 0.94, rotation: 0.6 },
            { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.28 },
          )
          .fromTo(
            mark,
            { opacity: 0.35, scale: 0.9, rotation: activeRotation - 5 },
            { opacity: 1, scale: 1, rotation: activeRotation, duration: 0.28 },
            0,
          )
          .to(composition, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.44 })
          .to(mark, { opacity: 1, scale: 1, rotation: activeRotation, duration: 0.44 }, '<')
          .to(composition, { opacity: 0, y: -44, scale: 0.97, rotation: -0.6, duration: 0.28 })
          .to(mark, { opacity: 0, scale: 0.92, rotation: activeRotation + 4, duration: 0.28 }, '<');
      });

      const experienceEntries = gsap.utils.toArray<HTMLElement>('#experience .experience-entry');
      const experienceHeading = gsap.utils.toArray<HTMLElement>('#experience .experience-heading-piece');
      const experienceTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#experience',
          start: 'top bottom',
          end: 'bottom top',
          scrub,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse',
        },
      });

      experienceTimeline
        .fromTo(
          experienceHeading,
          { opacity: 0.16, y: 32, color: '#9a9892' },
          { opacity: 1, y: 0, color: '#171717', stagger: 0.025, duration: 0.2 },
        )
        .fromTo(
          experienceEntries,
          { opacity: 0.12, y: 34, x: 0 },
          { opacity: 1, y: 0, x: 0, stagger: 0.025, duration: 0.2 },
          0.08,
        )
        .to([...experienceHeading, ...experienceEntries], { opacity: 1, y: 0, duration: 0.34 })
        .to(experienceEntries, {
          x: (entryIndex) => entryIndex % 2 === 0 ? '15vw' : '-15vw',
          opacity: 0.52,
          stagger: 0.018,
          duration: 0.17,
        })
        .to(experienceEntries, {
          x: (entryIndex) => entryIndex % 2 === 0 ? '18vw' : '-18vw',
          opacity: 0,
          stagger: 0.015,
          duration: 0.09,
        });

      const projectSection = rootElement.querySelector<HTMLElement>('#projects');
      const projectStage = projectSection?.querySelector<HTMLElement>('.projects-stage');
      const projectGrid = projectSection?.querySelector<HTMLElement>('.project-grid');
      const projectCards = gsap.utils.toArray<HTMLElement>('#projects .project-card');

      const collisionOffset = (element: HTMLElement) => {
        if (!projectStage) return { x: 0, y: 0 };
        const stageRect = projectStage.getBoundingClientRect();
        const cardRect = element.getBoundingClientRect();
        const mobileFactor = window.innerWidth < 700 ? 0.46 : 1;
        return {
          x: (stageRect.left + stageRect.width / 2 - (cardRect.left + cardRect.width / 2)) * mobileFactor,
          y: (stageRect.top + stageRect.height * 0.6 - (cardRect.top + cardRect.height / 2)) * mobileFactor,
        };
      };

      const projectTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: projectSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.82,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse',
          onUpdate: ({ progress }) => {
            projectGrid?.classList.toggle('is-colliding', progress < 0.29 || progress > 0.73);
          },
          onRefresh: ({ progress }) => {
            projectGrid?.classList.toggle('is-colliding', progress < 0.29 || progress > 0.73);
          },
        },
      });

      projectTimeline
        .fromTo(
          '#projects .projects-header',
          { opacity: 0.14, y: 28 },
          { opacity: 1, y: 0, duration: 0.24 },
        )
        .fromTo(
          projectCards,
          {
            x: (_, element) => collisionOffset(element as HTMLElement).x,
            y: (_, element) => collisionOffset(element as HTMLElement).y,
            scale: 0.72,
            opacity: 0.16,
          },
          { x: 0, y: 0, scale: 1, opacity: 1, stagger: 0.018, duration: 0.28 },
          0,
        )
        .to(['#projects .projects-header', ...projectCards], { opacity: 1, duration: 0.42 })
        .to(projectCards, {
          x: (_, element) => collisionOffset(element as HTMLElement).x,
          y: (_, element) => collisionOffset(element as HTMLElement).y,
          scale: 0.76,
          opacity: 0.58,
          stagger: 0.015,
          duration: 0.18,
        })
        .to(projectCards, { opacity: 0, stagger: 0.01, duration: 0.08 });

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: '65% 50%',
          scrub,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(
          '#contact .collab-word',
          {
            opacity: 0.08,
            x: (wordIndex) => wordIndex === 0 ? '-12vw' : '12vw',
            y: (wordIndex) => wordIndex === 0 ? -40 : 40,
            filter: 'blur(6px)',
          },
          { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', stagger: 0.04, duration: 0.5 },
        )
        .fromTo('.collab-detail', { opacity: 0.12, y: 26 }, { opacity: 1, y: 0, duration: 0.34 }, 0.16);
    }, root);

    let refreshFrame = 0;
    const refresh = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const refreshOnPageShow = () => refresh();
    const imageReady = Array.from(document.images).map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        image.addEventListener('load', () => resolve(), { once: true });
        image.addEventListener('error', () => resolve(), { once: true });
      });
    });

    void Promise.all([document.fonts.ready, ...imageReady]).then(refresh);
    window.addEventListener('load', refresh);
    window.addEventListener('pageshow', refreshOnPageShow);
    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(rootElement);

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener('load', refresh);
      window.removeEventListener('pageshow', refreshOnPageShow);
      resizeObserver.disconnect();
      rootElement.querySelector('.project-grid')?.classList.remove('is-colliding');
      context.revert();
    };
  }, [root]);
}
