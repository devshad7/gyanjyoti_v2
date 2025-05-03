import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Mentor } from "@/types/mentor"

interface MentorCardProps {
  mentor: Mentor
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg px-0 py-0 border-t-2 hover:-translate-y-1">
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          mentor.id % 3 === 0 ? "bg-yellow-400" : mentor.id % 3 === 1 ? "bg-blue-600" : "bg-pink-600"
        }`}
      />
      <CardHeader className="px-0 py-0" >
        <div className="relative h-64 mb-0 w-full bg-gradient-to-b from-gray-100 to-gray-200">
          <Image src={mentor.image || "/placeholder.svg"} alt={mentor.name} fill className="object-cover mb-0" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-1  text-gray-900">{mentor.name}</h3>
        <p className="text-gray-600 mb-2">{mentor.qualifications}</p>

        <div className="flex flex-wrap gap-2 mb-2">
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
            <AccordionTrigger className="text-sm font-medium px-0 py-1">Read Biography</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 text-sm">{mentor.bio}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
