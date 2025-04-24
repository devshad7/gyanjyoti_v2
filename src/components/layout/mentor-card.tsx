import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Mentor } from "@/types/mentor"

interface MentorCardProps {
  mentor: Mentor
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4 hover:-translate-y-1">
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          mentor.id % 3 === 0 ? "bg-yellow-400" : mentor.id % 3 === 1 ? "bg-blue-600" : "bg-pink-600"
        }`}
      />
      <CardHeader className="p-0">
        <div className="relative h-64 w-full bg-gradient-to-b from-gray-100 to-gray-200">
          <Image src={mentor.image || "/placeholder.svg"} alt={mentor.name} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-1 text-gray-900">{mentor.name}</h3>
        <p className="text-gray-600 mb-3">{mentor.qualifications}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.expertise.map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`
                ${
                  mentor.id % 3 === 0
                    ? "border-yellow-400 text-yellow-700"
                    : mentor.id % 3 === 1
                      ? "border-blue-600 text-blue-700"
                      : "border-pink-600 text-pink-700"
                }
              `}
            >
              {skill}
            </Badge>
          ))}
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="bio">
            <AccordionTrigger className="text-sm font-medium">Read Biography</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 text-sm">{mentor.bio}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4 flex justify-between">
          <Button
            variant="outline"
            className={`
              ${
                mentor.id % 3 === 0
                  ? "border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                  : mentor.id % 3 === 1
                    ? "border-blue-600 text-blue-700 hover:bg-blue-50"
                    : "border-pink-600 text-pink-700 hover:bg-pink-50"
              }
            `}
          >
            View Schedule
          </Button>
          <Button
            className={`
              ${
                mentor.id % 3 === 0
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : mentor.id % 3 === 1
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-pink-600 hover:bg-pink-700"
              }
            `}
          >
            Book Session
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
