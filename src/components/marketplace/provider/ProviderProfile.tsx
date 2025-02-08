import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MapPin,
  Clock,
  Globe,
  Instagram,
  Twitter,
  Building2,
  ArrowLeft,
} from "lucide-react";
import CertifiedBadge from "../CertifiedBadge";
import Map from "../Map";

interface ProviderProfileProps {
  providerName?: string;
  businessName?: string;
  providerImage?: string;
  rating?: number;
  location?: string;
  coordinates?: { lat: number; lng: number };
  about?: string;
  certificationTier?: "gold" | "silver" | "blue" | "unverified";
  services?: Array<{
    title: string;
    description: string;
    price: number;
    duration: number;
    image: string;
  }>;
  reviews?: Array<{
    id: string;
    userName: string;
    userImage: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  gallery?: string[];
  address?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
}

const ProviderProfile = ({
  businessName = "Tranquil Spirit Healing Center",
  providerImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  rating = 4.8,
  location = "Downtown Toronto",
  coordinates = { lat: 43.6532, lng: -79.3832 },
  about = `With over 15 years of dedicated experience in holistic healing and spiritual guidance, I've developed a comprehensive approach that combines ancient wisdom with modern therapeutic techniques. My journey began in traditional Reiki practices and has evolved to encompass a wide range of healing modalities.

I hold advanced certifications in Reiki (Master Level), Crystal Therapy, and Sound Healing, with specialized training in Traditional Chinese Medicine and Quantum Touch. My practice is built on the fundamental belief that true healing must address the whole person - mind, body, and spirit. I work closely with each client to create personalized healing experiences that align with their unique needs and spiritual journey.

My healing sanctuary is thoughtfully designed to provide a sacred and nurturing space where clients can safely explore their spiritual path and experience profound transformation. The space incorporates elements of sacred geometry, carefully selected crystals, and natural materials to enhance the healing energy.

I regularly attend international workshops and spiritual retreats to deepen my practice and bring new healing techniques to my clients. Recent studies include Advanced Energy Medicine at the Barbara Brennan School of Healing and Shamanic Practices with indigenous healers in Peru. I'm also a certified meditation teacher and have completed extensive training in trauma-informed healing practices.

My approach combines various modalities including:
- Reiki and Energy Healing
- Crystal Therapy and Grid Work
- Sound Healing with Tibetan Singing Bowls
- Chakra Balancing and Alignment
- Spiritual Counseling and Meditation Guidance
- Aromatherapy and Sacred Plant Medicine

I'm deeply committed to creating a safe, inclusive space where all are welcome to explore their spiritual journey. Whether you're seeking physical healing, emotional balance, spiritual growth, or simply a space for inner peace, I'm here to support and guide you with compassion, expertise, and understanding.`,
  certificationTier = "gold",
  services = [
    {
      title: "Chakra Balancing Session",
      description: "Complete energy alignment and chakra balancing therapy.",
      price: 120,
      duration: 90,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    },
    {
      title: "Spiritual Counseling",
      description:
        "One-on-one guidance for spiritual growth and personal development.",
      price: 95,
      duration: 60,
      image:
        "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=800",
    },
    {
      title: "Crystal Healing",
      description:
        "Healing session using carefully selected crystals and stones.",
      price: 85,
      duration: 45,
      image:
        "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800",
    },
  ],
  reviews = [
    {
      id: "1",
      userName: "Emily Chen",
      userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      rating: 5,
      comment:
        "Life-changing experience! Sarah has an incredible gift for healing.",
      date: "2024-03-15",
    },
    {
      id: "2",
      userName: "Michael Smith",
      userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4,
      comment: "Deeply transformative session. Highly recommended!",
      date: "2024-03-10",
    },
    {
      id: "3",
      userName: "Sofia Rodriguez",
      userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia",
      rating: 5,
      comment: "Professional, insightful, and truly gifted healer.",
      date: "2024-03-05",
    },
  ],
  address = "123 Healing Street, Suite 456, Toronto, ON M5V 2T6",
  website = "https://tranquilspirit.com",
  instagram = "tranquil.spirit",
  twitter = "tranquilspirit",
  gallery = [
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=800",
    "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800",
    "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=800",
  ],
}: ProviderProfileProps) => {
  const { id } = useParams();
  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    if (id) {
      // Convert URL-friendly ID back to provider name
      const decodedName = id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setProviderName(decodedName);
    }
  }, [id]);

  const [reviewsList, setReviewsList] = useState(reviews);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [sortBy, setSortBy] = useState("recent");

  // Calculate review statistics
  const reviewStats = {
    total: reviews.length,
    average: reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length,
    distribution: Array(5)
      .fill(0)
      .map((_, i) => ({
        stars: 5 - i,
        count: reviews.filter((r) => r.rating === 5 - i).length,
        percentage:
          (reviews.filter((r) => r.rating === 5 - i).length / reviews.length) *
          100,
      })),
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...reviews];
    if (value === "recent") {
      sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else if (value === "highest") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (value === "lowest") {
      sorted.sort((a, b) => a.rating - b.rating);
    }
    setFilteredReviews(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Provider Header */}
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={providerImage} alt={providerName} />
                <AvatarFallback>
                  {providerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{businessName}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-medium">{providerName}</span>
                  <CertifiedBadge tier={certificationTier} />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">
                      {rating}
                    </span>
                    <span>({reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <div className="prose max-w-none">
                {about.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="aspect-video mb-4 rounded-md overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration} min</span>
                        </div>
                        <Button>${service.price} - Book Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

              {/* Review Summary */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Overall Rating */}
                    <div className="text-center md:text-left">
                      <div className="text-4xl font-bold mb-2">
                        {reviewStats.average.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.round(reviewStats.average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on {reviewStats.total} reviews
                      </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="col-span-2">
                      <div className="space-y-2">
                        {reviewStats.distribution.map((dist) => (
                          <div
                            key={dist.stars}
                            className="flex items-center gap-2"
                          >
                            <div className="flex items-center gap-1 w-20">
                              <span className="text-sm">{dist.stars}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                            <Progress value={dist.percentage} className="h-2" />
                            <div className="w-12 text-sm text-muted-foreground">
                              {dist.count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sort Reviews */}
              <div className="flex justify-end mb-4">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage
                            src={review.userImage}
                            alt={review.userName}
                          />
                          <AvatarFallback>
                            {review.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.userName}</h4>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                          <p className="text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Map Card */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-[300px]">
                    <Map
                      services={[
                        {
                          id: "provider-location",
                          lat: coordinates.lat,
                          lng: coordinates.lng,
                          title: businessName,
                        },
                      ]}
                      onMarkerClick={() => {}}
                    />
                  </div>
                  <div className="p-4 border-t">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Building2 className="h-4 w-4 mt-1" />
                        <p className="text-sm">{address}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <Globe className="h-4 w-4" />
                          Website
                        </a>
                        <a
                          href={`https://instagram.com/${instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <Instagram className="h-4 w-4" />
                          Instagram
                        </a>
                        <a
                          href={`https://twitter.com/${twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
