# Reference design study

Reference: https://dipanshusingh.vercel.app

Inspected in a rendered desktop browser, including section screenshots, computed typography, navigation links, and the loaded 3D scenes.

## Visual direction

- Near-black navy canvas with dark violet cards; purple, blue, cyan, and pink accents.
- Poppins typography: desktop hero is 80px / 900 weight; primary section headings are 60px / 900. Supporting text uses muted lavender.
- Large vertical spacing, centered section titles, uppercase section introductions, rounded panels, fine purple borders, and restrained glows.
- Persistent navigation with a portrait/signature identity and links to About, Education, Work, Skills, Projects, and Contact.
- Thin gradient scroll-progress indicator across the top.

## Structure

1. Hero: personal greeting, gradient name, animated role text, short positioning statement, experience/contact actions, and a large 3D desktop workstation.
2. Overview: professional introduction, emoji-led points, and resume/social links.
3. Education: vertical timeline with institution markers and degree cards.
4. Work experience: selectable role cards on the left; a larger achievement panel on the right.
5. Skills: frontend, backend, and tooling groups with hexagonal technology tiles and code-like group labels.
6. Projects: three-column desktop card grid with screenshots, descriptions, technology badges, and live-site links.
7. Contact: form panel beside an animated globe, on a particle background.

## Motion and 3D

- The workstation is the hero's central 3D asset, beyond the decorative geometry.
- Flowing wireframe contours frame the hero; multiple wireframe objects float around it.
- Contact has its own 3D globe with surrounding segmented bands.
- Content reveals on scroll; sections can appear blank in a full-page screenshot until individually scrolled into view.
- An orbital loading screen precedes the main page; 3D assets can finish loading later than text.
- Role text animates; navigation uses section anchors; work selection updates the adjacent detail panel.

## Differences from the initial implementation

The initial portfolio used a mint editorial direction, smaller lighter typography, projects before biography, a compact employment list, and one decorative torus. That was not a close adaptation of the reference.

The subsequent animation update adds opening/closing project dialogs, seven floating 3D forms, wireframe waves, particles, lighting, cursor parallax, and scroll rotation. It does not yet reproduce the reference's workstation, contact globe, section order, education timeline, skill tiles, or interactive work-history layout.

For a closer adaptation, use the reference's structure and visual hierarchy with Simon's supplied resume and project content. Keep contact delivery unconfigured until real contact details are supplied. Respect reduced-motion preferences and retain keyboard navigation.
