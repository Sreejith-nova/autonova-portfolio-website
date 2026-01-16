"use client";

import { cn } from "./ui-primitives";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";
import Link from "next/link";

// ===================================
// ACETERNITY UI NAVBAR COMPONENT
// ===================================

export const Navbar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
};

export const NavBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollY.getPrevious() ?? 0;
      const direction = current - previous;

      setScrolled(current > 50);

      if (current < 50) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={navRef}
        animate={{
          y: visible ? 0 : -100,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-colors md:px-8",
          scrolled
            ? "border-b border-white/10 bg-black/50 backdrop-blur-md"
            : "bg-transparent",
          className
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const NavItems = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("hidden items-center gap-8 md:flex", className)}>
      {children}
    </div>
  );
};

export const MobileNav = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const MobileNavHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("flex items-center justify-between px-4 py-6", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8 px-6 py-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavToggle = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10 md:hidden"
        aria-label="Toggle navigation menu"
      >
        <IconMenu2 className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black md:hidden"
          >
            <MobileNavHeader>
              <div />
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Close navigation menu"
              >
                <IconX className="h-6 w-6" />
              </button>
            </MobileNavHeader>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const NavbarLogo = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80 md:text-2xl",
        className
      )}
    >
      {children}
    </Link>
  );
};

export const NavbarButton = ({
  className,
  children,
  href,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      href={href}
      className={cn(
        "rounded-full border border-white/20 bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};

// ===================================
// AUTONOVA NAVBAR INTEGRATION
// ===================================

export function AutonovaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "#thinking", label: "Philosophy" },
  ];

  const mobileNavLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "#thinking", label: "Philosophy" },
  ];

  return (
    <Navbar>
      <NavBody>
        {/* Logo */}
        <NavbarLogo>AUTONOVA</NavbarLogo>

        {/* Desktop Navigation */}
        <NavItems>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <NavbarButton
            href="https://cal.com/autonova-mfsbch/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a conversation
          </NavbarButton>
        </NavItems>

        {/* Mobile Navigation Toggle */}
        <MobileNav>
          <MobileNavToggle open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
        </MobileNav>
      </NavBody>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black md:hidden"
          >
            <MobileNavHeader>
              <div />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Close navigation menu"
              >
                <IconX className="h-6 w-6" />
              </button>
            </MobileNavHeader>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex h-[calc(100%-88px)] flex-col items-center justify-center gap-8"
            >
              {mobileNavLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-bold text-white transition-colors hover:text-white/80"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <a
                  href="https://cal.com/autonova-mfsbch/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 rounded-full border border-white/20 bg-white px-8 py-4 text-lg font-medium text-black transition-colors hover:bg-white/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a conversation
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Navbar>
  );
}
