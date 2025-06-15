"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "I had no idea my pitch was weak until I saw my score. We fixed it and closed $600K in 6 weeks.",
    name: "Alex",
    title: "Founder @ Synthex",
    avatar: "/placeholder.svg?width=40&height=40",
  },
  {
    quote: "It’s like a cheat code for founders. Clear, honest, and worth every dollar.",
    name: "Jill",
    title: "CEO @ Quantumish",
    avatar: "/placeholder.svg?width=40&height=40",
  },
  {
    quote: "Investors started taking us seriously after we followed the roadmap. Game-changer.",
    name: "Rahul",
    title: "Co-founder @ PulseCheck",
    avatar: "/placeholder.svg?width=40&height=40",
  },
  {
    quote: "The personalized roadmap was the most valuable part. It gave us a clear path to our seed round.",
    name: "Sarah",
    title: "Founder @ DataWeave",
    avatar: "/placeholder.svg?width=40&height=40",
  },
]

export function TestimonialCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-4xl mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="h-full">
                <CardContent className="flex flex-col justify-between h-full p-6">
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  )
}
