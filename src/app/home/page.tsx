"use client";

import React, { useRef, useEffect } from 'react';
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import sunsetHikeBg from "../../../public/assets/sunset_hike_bg_cropped.png";
import sunsetHikeBgRemove from "../../../public/assets/sunset_hike_bg_cropped_remove.png"; //just for testing very ugly quality lah
import welcomingFreshman from "../../../public/assets/welcoming-freshman.png";
import futsalOlym from "../../../public/assets/futsal-olym.png";
import hikingPermisi from "../../../public/assets/hiking-permisi.png";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

import { Inter} from "next/font/google";
import EventCard from '@/components/eventCard';

const inter = Inter({
	subsets: ["latin"],
});

const HomePage = () => {
	const heroSectionRef = useRef(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const imageContainerRef = useRef(null);
	const navBarRef = useRef(null);
	const whoAreWeRef = useRef(null);
	const whoAreWeTitleRef = useRef(null);
	const whoAreWeTextRef = useRef(null);
	const whoAreWeImageRef = useRef(null);


	//use effects for gsap animation
	//title beginning animation
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		ScrollSmoother.create({
			wrapper: "#smooth-wrapper",
			content: "#smooth-content",
			smooth: 2,
			effects: true,
			smoothTouch: 0.3,
		});

		if (!titleRef.current || !heroSectionRef.current) return;

		const tl = gsap.timeline();

		gsap.set(titleRef.current, { opacity: 0, y: 50 });
		gsap.set(titleRef.current.children[0], { opacity: 0, y: -300 });
		gsap.set(titleRef.current.children[1], { opacity: 0, x: -50 });
		gsap.set(titleRef.current.children[2], { opacity: 0, x: 50 });

		tl.to(titleRef.current, {
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power2.out"
		})
			.to(titleRef.current.children[0], {
				opacity: 1,
				scale: 1,
				y: 0,
				duration: 1.5,
				ease: "back.out(1.7)"
			}, "-=0.3")
			.to(titleRef.current.children[1], {
				opacity: 1,
				x: 0,
				duration: 0.8,
				ease: "power2.out"
			}, "-=0.5")
			.to(titleRef.current.children[2], {
				opacity: 1,
				x: 0,
				duration: 0.8,
				ease: "power2.out"
			}, "-=0.6");

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		let heroScrollTrigger: globalThis.ScrollTrigger;

		gsap.fromTo(titleRef.current,
			{ y: 0 },
			{
				y: "75vh",
				ease: "none",
				scrollTrigger: {
					trigger: heroSectionRef.current,
					start: "top top",
					end: "bottom top",
					scrub: 0.5,
					pin: heroSectionRef.current,
					pinSpacing: true,
					markers: true,
					onUpdate: (self) => {
						heroScrollTrigger = self;
					},
				}
			}
		);

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	}, []);

	//navbar
	useEffect(() => {
		const showAnim = gsap.from(navBarRef.current, {
			yPercent: -100,
			paused: true,
			duration: 0.3
		}).progress(1);

		ScrollTrigger.create({
			start: "top top",
			end: "max",
			markers: true,
			onUpdate: (self) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				self.direction === -1 ? showAnim.play() : showAnim.reverse()
			}
		});
	}, [])

	//who are we
	useEffect(() => {
		if (whoAreWeTitleRef.current && whoAreWeTextRef.current) {
			gsap.set([whoAreWeTitleRef.current, whoAreWeTextRef.current], {
				opacity: 0,
				y: 50
			});

			gsap.timeline({
				scrollTrigger: {
					trigger: whoAreWeRef.current,
					start: "top 40%",
					end: "bottom 50%",
					toggleActions: "play reverse play reverse",
					markers: true
				}
			})
				.to(whoAreWeTitleRef.current, {
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out"
				})
				.to(whoAreWeTextRef.current, {
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out"
				}, "-=0.4");
		}
	}, []);

	//the parallax image whoarewe
	useEffect(() => {
		if (whoAreWeImageRef.current) {
			gsap.to(whoAreWeImageRef.current, {
				yPercent: -33.33,
				ease: "none",
				scrollTrigger: {
					trigger: whoAreWeRef.current,
					start: "top bottom",
					end: "bottom top",
					scrub: 1,
					markers: false
				}
			});
		}
	}, []);


	return (
		<div id="smooth-wrapper" className='overflow-hidden'>
			<div className="w-full absolute top-0 left-0 z-50" ref={navBarRef}>
				<div className="w-full">
					<Navbar />
				</div>
			</div>
			<div id="smooth-content" className='flex flex-col'>
				<div ref={heroSectionRef} className="hero-section h-screen overflow-hidden">
					<div ref={imageContainerRef} className="absolute inset-0 w-full h-full">
						<Image
							src={sunsetHikeBg}
							className="absolute inset-0 w-full h-full object-cover"
							alt="bg-main-1"
						/>
						<Image
							src={sunsetHikeBgRemove}
							className="absolute inset-0 w-full h-full object-cover z-60"
							alt="bg-main-1"
						/>
					</div>

					<div ref={titleRef} className='inset-0 flex flex-col items-center pt-40'>
						<div className={`${inter.className} font-bold relative text-[#82181A] text-7xl lg:text-9xl md:text-7xl sm:text-7xl justify-center`}>
							{"PERMISI"}
						</div>
						<div className={`${inter.className} font-bold relative text-white lg:text-2xl md:text-xl sm:text-lg mt-2 text-center mx-4 sm:mx-10`}>
							{"Persatuan Mahasiswa Indonesian CityU Hong Kong"}
						</div>
						<div className={`${inter.className} font-bold relative text-white lg:text-2xl md:text-xl sm:text-lg mt-2 text-center mx-4 sm:mx-10`}>
							{"Indonesian Students' Association of City University of Hong Kong"}
						</div>
					</div>
				</div>

				<div id="definitionBox" className="h-screen w-full bg-white flex flex-col md:flex-row" ref={whoAreWeRef}>
					<section className='hidden md:block md:w-1/2 lg:w-1/2 bg-blue-300 relative overflow-hidden'>
						<div className="flex flex-col h-[300%]" ref={whoAreWeImageRef}>
							<div className="h-1/6 w-full">
								<Image
									src={hikingPermisi}
									className="w-full h-full object-cover"
									alt="permisiPhotos-layer3"
								/>
							</div>
							<div className="h-1/6 w-full">
								<Image
									src={futsalOlym}
									className="w-full h-full object-cover"
									alt="permisiPhotos-layer1"
								/>
							</div>
							<div className="h-1/6 w-full">
								<Image
									src={welcomingFreshman}
									className="w-full h-full object-cover"
									alt="permisiPhotos-layer2"
								/>
							</div>
							<div className="h-1/6 w-full">
								<Image
									src={hikingPermisi}
									className="w-full h-full object-cover"
									alt="permisiPhotos-layer3"
								/>
							</div>
						</div>
					</section>
					<section className="w-full md:w-1/2 lg:w-1/2 h-screen items-center justify-center flex">
						<div className="max-w-7xl mx-auto items-center flex justify-center px-4 py-10 sm:px-6 lg:px-8">
							<div className="text-center mb-10">
								<h2
									className={`text-4xl font-bold text-gray-900 mb-8`} ref={whoAreWeTitleRef}
								>
									{"Who are We?"}
								</h2>
								<div className="max-w-7xl mx-auto" ref={whoAreWeTextRef}>
									<p
										className={`text-lg text-gray-600 leading-relaxed mb-12`}
									>
										<span className={`font-extrabold text-normal-maroon`}>
											{"PERMISI HK"}
										</span>{" "}
										{"is a vibrant community of Indonesian students studying at"}{" "}
										<a
											href="https://www.cityu.edu.hk"
											target="_blank"
											rel="noopener noreferrer"
											className={`font-bold text-normal-maroon hover:underline`}
										>
											{"City University of Hong Kong"}
										</a>
										{". We serve as a bridge connecting Indonesian culture with the international academic environment, fostering friendship,academic excellence, and cultural exchange. Our association provides support, networking opportunities, and a home away from home for Indonesian students pursuing their dreams in Hong Kong."}
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>

				<div>
					<section className="py-5 h-screen flex items-center justify-center">
						<div className="max-w-7xlmx-auto px-4 sm:px-6 md:px-8">
							<div className="text-center mb-16">
								<h2
									className={`text-4xl font-bold text-gray-900 mb-12`}
								>
									{"Latest Event"}
								</h2>
								<EventCard />
							</div>
						</div>
					</section>
				</div>

				<div>
					<Footer />
				</div>
			</div>
		</div>

	);
};

export default HomePage;