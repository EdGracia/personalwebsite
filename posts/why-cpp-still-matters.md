---
title: "Why C++ Still Matters"
date: "2026-06-05"
summary: "Everyone wants to argue that C++ is dying. They're wrong."
author: "Ed Gracia"
---

![C++ Logo](/c++-logo.png)

Every few months someone publishes a new article declaring C++ dead. They point to Rust's memory safety, Python's simplicity, or Go's concurrency model. They're not entirely wrong about those languages — but they're missing the point entirely.

C++ isn't popular because it's easy. It's popular because nothing else does what it does.

## What C++ Actually Is

C++ is the language that lets you get as close to the metal as possible while still writing in something that resembles structured, object-oriented code. You control memory. You control the stack. You decide when things are allocated and when they're freed. That level of control isn't a burden — it's the entire point.

When I started building my 3D game engine, I could have reached for Unity or Unreal. Both are incredible pieces of software, and both are written largely in C++. There's a reason for that.

## Performance Isn't Optional Everywhere

For most applications, performance is a nice-to-have. A web app that responds in 50ms instead of 10ms probably won't lose users. A game that drops from 120fps to 60fps absolutely will. A real-time rendering engine that wastes cycles on garbage collection will stutter at the worst possible moment.

C++ gives you deterministic performance. There's no garbage collector pausing your program at an inconvenient time. There's no runtime adding overhead you didn't ask for. When you write a tight inner loop in C++, you know roughly what the CPU is going to do with it.

That predictability is what makes C++ irreplaceable in:

- Game engines and real-time graphics
- Operating systems and embedded systems
- High-frequency trading
- Audio processing and digital signal processing
- Physics simulations

These aren't niche use cases. They're some of the most technically demanding software that exists.

## The Learning Value

Here's something nobody tells you: learning C++ makes you dramatically better at every other language you use.

When you've spent time manually managing memory, you understand why Python's garbage collector exists and what it's doing. When you've written your own data structures in C++, you understand the performance implications of ArrayList vs LinkedList in Java. When you've debugged a segfault, you understand memory layout in a way that no amount of high-level programming will teach you.

C++ is hard in exactly the right ways. It forces you to confront how computers actually work — not an abstraction of how computers work.

## The Argument Against It

The most honest criticism of C++ is memory safety. C++ gives you a loaded gun, and if you're not careful, you will shoot yourself with it. Buffer overflows, use-after-free bugs, dangling pointers — these are real, and they've caused real security vulnerabilities.

Rust was built to solve this, and it does it well. If I were writing a systems-level service where memory safety was the top priority, I'd seriously consider Rust.

But Rust and C++ are solving different problems. Rust optimizes for safety. C++ optimizes for control. In game development, where you're often doing things that feel unsafe by design — writing directly to GPU memory, managing complex object lifetimes across frames, working with low-level platform APIs — the control matters more.

## Where This Leaves Us

C++ isn't going anywhere. It's the language that sits underneath most of the software that demands performance above all else. Every major game engine — Unreal, Unity, Godot — is either written in C++ or has a C++ core.

I chose C++ for my engine because I wanted to understand what's actually happening. Not the engine's abstraction. Not the framework's version of it. The real thing.

That choice has made everything harder and more interesting in equal measure. I wouldn't trade it.
