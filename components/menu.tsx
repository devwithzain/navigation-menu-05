"use client";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function Menu() {
	const [isAnimating, setIsAnimating] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const splitTextIntoSpans = (selector: string) => {
		const elements = document.querySelectorAll<HTMLElement>(selector);
		elements.forEach((element) => {
			const text = element.innerText;
			const splitText = text
				.split("")
				.map(function (char) {
					return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
				})
				.join("");
			element.innerHTML = splitText;
		});
	};

	useEffect(() => {
		CustomEase.create(
			"hop",
			"M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1",
		);

		splitTextIntoSpans(".header h1");

		const menuToggle = document.querySelector(".menu-toggle");
		const menu = document.querySelector(".menu");
		const links = document.querySelectorAll<HTMLElement>(".link");
		const socialLinks = document.querySelectorAll<HTMLElement>(".socials p");

		const openMenu = () => {
			setIsAnimating(true);
			gsap.to(menu, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "hop",
				duration: 1.5,
				onStart: () => {
					(menu as HTMLElement).style.pointerEvents = "all";
				},
				onComplete: () => {
					setIsAnimating(false);
				},
			});

			gsap.to(links, {
				y: 0,
				opacity: 1,
				stagger: 0.1,
				delay: 0.85,
				duration: 1,
				ease: "power3.out",
			});

			gsap.to(socialLinks, {
				y: 0,
				opacity: 1,
				stagger: 0.05,
				delay: 0.85,
				duration: 1,
				ease: "power3.out",
			});

			gsap.to(".video-wrapper", {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "hop",
				duration: 1.5,
				delay: 0.5,
			});

			gsap.to(".header h1 span", {
				rotateY: 0,
				stagger: 0.05,
				delay: 0.75,
				duration: 1.5,
				ease: "power4.out",
			});

			gsap.to(".header h1 span", {
				y: 0,
				scale: 1,
				stagger: 0.05,
				delay: 0.5,
				duration: 1.5,
				ease: "power4.out",
			});
		};

		const closeMenu = () => {
			setIsAnimating(true);
			gsap.to(menu, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
				ease: "hop",
				duration: 1.5,
				onComplete: () => {
					(menu as HTMLElement).style.pointerEvents = "none";
					gsap.set(menu, {
						clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
					});
					gsap.set(links, { y: 30, opacity: 0 });
					gsap.set(socialLinks, { y: 30, opacity: 0 });
					gsap.set(".video-wrapper", {
						clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
					});
					gsap.set(".header h1 span", {
						y: 500,
						rotateY: 90,
						scale: 0.75,
					});
					setIsAnimating(false);
				},
			});
		};

		const toggleMenu = () => {
			if (isAnimating) return;
			if (menuOpen) {
				closeMenu();
				setMenuOpen(false);
			} else {
				openMenu();
				setMenuOpen(true);
			}
		};

		menuToggle?.addEventListener("click", toggleMenu);

		return () => {
			menuToggle?.removeEventListener("click", toggleMenu);
		};
	}, [isAnimating, menuOpen]);

	return (
		<div className="w-full h-screen bg-[url('/hero.jpg')] bg-cover bg-center">
			<div className="logo">
				<Link href="/">Avaro</Link>
			</div>
			<div className={`menu-toggle ${menuOpen ? "opened" : "closed"}`}>
				<div className="menu-toggle-icon">
					<div className="hamburger">
						<div
							className="menu-bar"
							data-position="top"></div>
						<div
							className="menu-bar"
							data-position="bottom"></div>
					</div>
				</div>
				<div className="menu-copy">
					<p>Menu</p>
				</div>
			</div>

			<div className="menu">
				<div className="col col-1">
					<div className="menu-logo">
						<Link href="/">Avaro</Link>
					</div>
					<div className="links">
						<div className="link">
							<Link href="/">Projects</Link>
						</div>
						<div className="link">
							<Link href="/">Expertise</Link>
						</div>
						<div className="link">
							<Link href="/">Agency</Link>
						</div>
						<div className="link">
							<Link href="/">Contact</Link>
						</div>
					</div>
					<div className="video-wrapper">
						<video
							muted
							src="/video.mp4"
							loop
							autoPlay
						/>
					</div>
				</div>
				<div className="col col-2">
					<div className="socials">
						<div className="sub-col">
							<p>Avaro</p>
							<p>9 quao Androe Rockfield</p>
							<p>69001 Ontario</p>
							<p>Canada</p>
							<br />
							<p>contact@Avaro.fr</p>
							<p>job@Avaro.fr</p>
						</div>
						<div className="sub-col">
							<p>Instagram</p>
							<p>LinkedIn</p>
							<p>Twitter</p>
							<p>Facebook</p>
							<br />
							<p>01 62 31 82 42</p>
						</div>
					</div>

					<div className="header">
						<h1>Avaro</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
