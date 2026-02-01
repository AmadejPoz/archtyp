"use client";

import FadeIn from "../animations/FadeIn";

export default function Problem() {
  return (
    <section id="problem" className="py-24 bg-archtyp-bg-problem">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-archtyp-bg-primary mb-8">
              The Problem
            </h2>

            <div className="space-y-6 text-lg text-archtyp-bg-secondary leading-relaxed">
              <p>
                A hotel buys a robot for €20,000. The robot can navigate, deliver items, look
                impressive in the lobby. But when a German guest asks &quot;where is the pool?&quot; —
                the robot fails. It doesn&apos;t understand the question. It doesn&apos;t speak German. It has
                no idea what pool the guest is talking about.
              </p>

              <p>
                The staff keeps doing the work. Guests avoid the robot. The investment sits in a
                corner, blinking.
              </p>

              <p>
                This happens because robot manufacturers are hardware companies. They build
                excellent machines — precise navigation, reliable motors, beautiful industrial
                design. But conversation is not their core competency. Their voice interfaces are
                afterthoughts: keyword matching, scripted responses, English-only, no memory.
              </p>

              <p className="font-semibold text-archtyp-bg-primary text-xl">
                The result is robots that can move but cannot connect. Robots that are present but
                not useful. Robots that create work instead of removing it.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
