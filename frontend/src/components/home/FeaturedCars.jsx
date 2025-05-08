import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'
import { ArrowRight } from 'lucide-react'
import CarCard from '../cars/CarCard.jsx';
// Mock data for featured cars
const featuredCars = [
  {
    id: '1',
    title: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 120,
    location: 'New York',
    year: 2022,
    seats: 5,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
  },
  {
    id: '2',
    title: 'BMW 3 Series',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 95,
    location: 'Los Angeles',
    year: 2021,
    seats: 5,
    rating: 4.7,
    reviewCount: 89,
    featured: true,
  },
  {
    id: '3',
    title: 'Audi Q5',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 110,
    location: 'Chicago',
    year: 2020,
    seats: 5,
    rating: 4.8,
    reviewCount: 102,
    featured: true,
  },
  {
    id: '4',
    title: 'Mercedes-Benz E-Class',
    image: 'https://images.unsplash.com/photo-1549925862-990918eb7f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    price: 135,
    location: 'Miami',
    year: 2022,
    seats: 5,
    rating: 4.9,
    reviewCount: 76,
    featured: true,
  },
]

const FeaturedCars = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-10">
          <div>
            
            <h2 className="text-3xl font-heading font-bold text-left">Featured Cars</h2>
            <p className="text-gray-600 mt-2">Explore our most popular rental options</p>
          </div>
          <Button variant="ghost" className="text-carloo-500 hover:text-carloo-600" asChild>
            <Link to="/listings" className="flex items-center">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCars
