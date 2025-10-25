export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 15',
    excerpt: 'Learn the fundamentals of Next.js 15 and how to build modern web applications.',
    content: `Next.js 15 is a powerful React framework that makes building web applications easier than ever. With new features like Turbopack, improved React Server Components, and enhanced performance optimizations, it's the perfect choice for modern web development.

In this post, we'll cover:
- Setting up a new Next.js 15 project
- Understanding the new App Router
- Working with React Server Components
- Optimizing your application for performance

Next.js 15 introduces Turbopack, a new Rust-based bundler that provides significant performance improvements over Webpack. Development startup times are up to 700 times faster, and hot module replacement is up to 10 times faster.

The App Router, which became stable in Next.js 13, is now the default and only routing system. It provides a more intuitive file-system based routing approach and better support for nested layouts and loading states.

React Server Components allow you to render components on the server, reducing bundle sizes and improving initial load times. They're now enabled by default in Next.js 15.

With these improvements and more, Next.js 15 is the most powerful version yet for building performant, scalable web applications.`,
    date: '2025-09-15',
    author: 'Alex Johnson',
    slug: 'getting-started-nextjs-15'
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS in 2025',
    excerpt: 'Discover the latest features and best practices for using Tailwind CSS in modern web development.',
    content: `Tailwind CSS continues to evolve with new features that make styling web applications faster and more efficient. In 2025, we're seeing exciting updates that improve developer experience and performance.

Key features in the latest version include:
- Enhanced JIT mode for even faster builds
- First-class TypeScript support with better autocomplete
- New color palette utilities
- Improved dark mode capabilities
- Better plugin ecosystem

Tailwind's JIT (Just-In-Time) compiler has been significantly improved. It now compiles CSS on-demand, generating styles only for the classes you actually use. This results in smaller CSS bundles and faster build times.

The framework now provides first-class TypeScript support with enhanced autocomplete. This helps developers write CSS classes more efficiently with better IDE support and reduced errors.

The new color palette includes more accessible color combinations and better support for dark mode. These updates make it easier to create visually appealing interfaces that meet accessibility standards.

Dark mode support has been enhanced with new utilities and better customization options. You can now easily create dark mode variants for your components with minimal configuration.

With a growing plugin ecosystem, Tailwind CSS makes it simple to extend functionality and add new utilities for specific use cases. Popular plugins include forms, typography, and aspect ratio utilities.`,
    date: '2025-09-10',
    author: 'Sam Smith',
    slug: 'mastering-tailwind-css-2025'
  },
  {
    id: '3',
    title: 'Building Accessible React Components',
    excerpt: 'Learn how to create React components that are accessible to all users, including those using assistive technologies.',
    content: `Creating accessible React components is crucial for ensuring your application can be used by everyone. Accessibility shouldn't be an afterthought but a fundamental part of your development process.

Key accessibility principles for React components:
- Proper semantic HTML structure
- Keyboard navigation support
- ARIA attributes for enhanced screen reader support
- Color contrast and visual indicators
- Focus management

Semantic HTML is the foundation of accessible components. Using the correct HTML elements (button instead of div for clickable elements, nav for navigation, etc.) provides built-in accessibility features.

Keyboard navigation is essential for users who can't use a mouse. All interactive elements should be focusable and operable using keyboard controls. This includes proper tab order and visible focus indicators.

ARIA (Accessible Rich Internet Applications) attributes enhance accessibility for screen reader users. Attributes like aria-label, aria-describedby, and role provide additional context that isn't available through semantic HTML alone.

Color contrast is important for users with visual impairments. Ensure sufficient contrast between text and background colors, and don't rely solely on color to convey information.

Focus management becomes critical in complex components like modals and dropdowns. Properly managing focus ensures users can navigate your application effectively.

Testing your components with screen readers and keyboard-only navigation is the best way to ensure they're truly accessible.`,
    date: '2025-09-05',
    author: 'Taylor Reed',
    slug: 'building-accessible-react-components'
  },
  {
    id: '4',
    title: 'State Management in Modern React',
    excerpt: 'Explore different state management solutions for React applications and when to use each one.',
    content: `State management is a critical aspect of React development. As applications grow in complexity, choosing the right state management solution becomes increasingly important.

Popular state management solutions include:
- React's built-in useState and useReducer
- Context API for global state
- Redux Toolkit for complex applications
- Zustand for lightweight state management
- Jotai for atomic state management

React's built-in hooks like useState and useReducer are perfect for component-level state. They're simple to use and don't require additional dependencies.

The Context API is ideal for global state that doesn't change frequently. It's built into React and works well for themes, user authentication, and other application-wide data.

Redux Toolkit is the modern standard for complex state management. It provides powerful features like time-travel debugging, middleware support, and predictable state updates.

Zustand is a lightweight alternative to Redux with a simpler API. It's perfect for applications that need global state management but don't require Redux's full feature set.

Jotai offers atomic state management, allowing you to create granular state atoms that can be composed together. This approach can reduce re-renders and improve performance.

Choosing the right solution depends on your application's complexity, team familiarity, and performance requirements. Start simple with useState and Context, then add more sophisticated solutions as needed.`,
    date: '2025-08-28',
    author: 'Jordan Lee',
    slug: 'state-management-modern-react'
  },
  {
    id: '5',
    title: 'Performance Optimization Techniques for Web Apps',
    excerpt: 'Discover proven techniques to optimize the performance of your web applications for better user experience.',
    content: `Web performance is crucial for user experience and SEO. Slow-loading applications can lead to higher bounce rates and lower conversion rates. Here are proven techniques to optimize your web applications.

Core optimization strategies:
- Code splitting and lazy loading
- Image optimization and modern formats
- Caching strategies and service workers
- Minimizing JavaScript bundles
- Optimizing CSS delivery
- Server-side rendering and static generation

Code splitting allows you to break your application into smaller chunks that are loaded on demand. This reduces the initial bundle size and improves load times. React's lazy and Suspense APIs make this straightforward to implement.

Image optimization is often overlooked but can significantly impact performance. Use modern formats like WebP and AVIF, implement responsive images with srcset, and lazy load images that aren't immediately visible.

Caching strategies can dramatically improve repeat visits. Implement HTTP caching headers, use service workers for offline functionality, and consider using a CDN for static assets.

Minimizing JavaScript bundles involves removing unused code (tree shaking), using code splitting, and optimizing dependencies. Tools like Webpack Bundle Analyzer can help identify optimization opportunities.

CSS delivery optimization includes minimizing CSS files, eliminating unused styles, and ensuring critical CSS is loaded first. Consider using CSS-in-JS solutions that automatically optimize CSS delivery.

Server-side rendering (SSR) and static site generation (SSG) can improve initial load times by sending pre-rendered HTML to the browser. Next.js makes implementing these techniques straightforward with its built-in support.

Regular performance monitoring with tools like Lighthouse, Web Vitals, and real user monitoring (RUM) helps identify performance regressions and areas for improvement.`,
    date: '2025-08-20',
    author: 'Morgan Chen',
    slug: 'performance-optimization-web-apps'
  }
];