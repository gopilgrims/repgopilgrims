import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface ParsedTrip {
  organizer: string;
  destinations: string[];
  departureDates: string[];
  duration: string;
  price: string;
  includes: string[];
  excludes: string[];
  requirements: string[];
  contact: string;
  location: string;
  rawText: string;
}

export default function WhatsAppParser() {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [parsedTrips, setParsedTrips] = useState<ParsedTrip[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseWhatsAppMessage = (text: string): ParsedTrip[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const trips: ParsedTrip[] = [];
    
    let organizer = "";
    let contact = "";
    let location = "";
    let currentTrip: Partial<ParsedTrip> = {};
    let inIncludesSection = false;
    let inExcludesSection = false;
    let inRequirementsSection = false;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Extract organizer name
      if (trimmed.startsWith("As ") && trimmed.includes("Tours")) {
        organizer = trimmed.replace("As ", "");
        continue;
      }
      
      // Extract location
      if (trimmed === "MUMBAI" || trimmed === "DELHI" || trimmed === "PUNE" || trimmed === "HYDERABAD") {
        location = trimmed;
        continue;
      }
      
      // Extract contact
      if (trimmed.startsWith("Contact") || trimmed.includes("Tours") && trimmed !== organizer) {
        contact = trimmed;
        continue;
      }
      
      // Detect trip sections
      if (trimmed.includes("Only") || trimmed.includes("Umrah") || trimmed.includes("Iraq") || trimmed.includes("Iran")) {
        if (currentTrip.destinations) {
          // Save previous trip
          trips.push({
            organizer,
            destinations: currentTrip.destinations || [],
            departureDates: currentTrip.departureDates || [],
            duration: currentTrip.duration || "",
            price: currentTrip.price || "",
            includes: currentTrip.includes || [],
            excludes: currentTrip.excludes || [],
            requirements: currentTrip.requirements || [],
            contact,
            location,
            rawText: text
          });
        }
        
        // Start new trip
        currentTrip = {
          destinations: [trimmed],
          departureDates: [],
          includes: [],
          excludes: [],
          requirements: []
        };
        inIncludesSection = false;
        inExcludesSection = false;
        inRequirementsSection = false;
        continue;
      }
      
      // Extract departure dates
      if (trimmed.startsWith("Dep:")) {
        const dates = trimmed.replace("Dep:", "").trim().split("/");
        currentTrip.departureDates = dates.map(d => d.trim());
        continue;
      }
      
      // Extract duration
      if (trimmed.startsWith("Days:")) {
        currentTrip.duration = trimmed.replace("Days:", "").trim();
        continue;
      }
      
      // Extract price
      if (trimmed.startsWith("Prices:") || trimmed.startsWith("Price:")) {
        currentTrip.price = trimmed.replace(/Prices?:/, "").trim();
        continue;
      }
      
      // Section markers
      if (trimmed.includes("INCLUDES:")) {
        inIncludesSection = true;
        inExcludesSection = false;
        inRequirementsSection = false;
        continue;
      }
      
      if (trimmed.includes("Excludes:")) {
        inIncludesSection = false;
        inExcludesSection = true;
        inRequirementsSection = false;
        continue;
      }
      
      if (trimmed.includes("Requirement:")) {
        inIncludesSection = false;
        inExcludesSection = false;
        inRequirementsSection = true;
        continue;
      }
      
      // Add content to appropriate sections
      if (inIncludesSection && trimmed && !trimmed.includes("INCLUDES")) {
        currentTrip.includes?.push(trimmed);
      }
      
      if (inExcludesSection && trimmed && !trimmed.includes("Excludes")) {
        currentTrip.excludes?.push(trimmed);
      }
      
      if (inRequirementsSection && trimmed && !trimmed.includes("Requirement")) {
        currentTrip.requirements?.push(trimmed);
      }
    }
    
    // Save last trip
    if (currentTrip.destinations) {
      trips.push({
        organizer,
        destinations: currentTrip.destinations || [],
        departureDates: currentTrip.departureDates || [],
        duration: currentTrip.duration || "",
        price: currentTrip.price || "",
        includes: currentTrip.includes || [],
        excludes: currentTrip.excludes || [],
        requirements: currentTrip.requirements || [],
        contact,
        location,
        rawText: text
      });
    }
    
    return trips;
  };

  const handleParse = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const parsed = parseWhatsAppMessage(message);
      setParsedTrips(parsed);
      setIsProcessing(false);
    }, 1000);
  };

  const sampleMessage = `As Serat Tours
Wiladat Of Rasool E Khuda (saws) and Imam Jafar E Sadiq(as) 

Only Umrah 
Dep: 7th Sept
Days: 12
Prices: 99000/- 
Wiladat of Rasool E Khuda(saws) & Imam Jafar E Sadiq(as) in Madina

Umrah/Iraq/Iran
Dep: 6th Sep/
Days: 28 
Prices: 225000/-
Wiladat of Rasool E Khuda(saws) & Imam Jafar E Sadiq(as) in Madina & Wiladat of Imam Hasan Askari(as) in Qom

Iran Iraq 
Dep: 6th Sep/ 16 Sep
Days: 21
Price: 140000/- 

Only Iraq 
Dep: 6th Sep/ 16 Sep
Days: 11
Price: 99000/-

Only Iran 
Dep: 16th Sep / 26th Sep
Days: 11
Price: 80000/-

Requirement:
1) Properly Scanned Passport
2) Photograph with Whitebackground 
3) Pancard Copy
4) Iran Visa is Free provided ziareen not travel in last 6 months additional charge to be borne by ziareen for Iran Visa

INCLUDES:
Rtn Ticket, Visa, Accommodation, Food, and Transport

Excludes:
Anything not mentioned in includes

Contact
As Serat Tours
MUMBAI`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            WhatsApp Message Parser
          </CardTitle>
          <p className="text-sm text-gray-600">
            Paste WhatsApp tour announcements to extract structured trip information
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              WhatsApp Message Content
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste the WhatsApp tour announcement here..."
              rows={12}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleParse} disabled={!message.trim() || isProcessing}>
              {isProcessing ? "Processing..." : "Parse Message"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setMessage(sampleMessage)}
            >
              Load Sample
            </Button>
          </div>
        </CardContent>
      </Card>

      {parsedTrips.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Parsed Trip Information</h3>
          {parsedTrips.map((trip, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{trip.destinations.join(" / ")}</CardTitle>
                  <Badge className="bg-verified text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Parsed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Organizer:</span>
                    <p className="font-medium">{trip.organizer}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Duration:</span>
                    <p className="font-medium">{trip.duration} days</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Price:</span>
                    <p className="font-medium">₹{trip.price}</p>
                  </div>
                </div>
                
                {trip.departureDates.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Departure Dates:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {trip.departureDates.map((date, idx) => (
                        <Badge key={idx} variant="outline">{date}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {trip.includes.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Includes:</span>
                    <p className="text-sm mt-1">{trip.includes.join(", ")}</p>
                  </div>
                )}
                
                {trip.requirements.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Requirements:</span>
                    <ul className="text-sm mt-1 space-y-1">
                      {trip.requirements.map((req, idx) => (
                        <li key={idx}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="pt-2 border-t">
                  <span className="text-sm font-medium text-gray-600">Contact:</span>
                  <p className="text-sm">{trip.contact} - {trip.location}</p>
                </div>
                
                <Button className="w-full mt-4">
                  <Upload className="w-4 h-4 mr-2" />
                  Create Trip Listing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}