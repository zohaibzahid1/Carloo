import { useState, useEffect } from 'react';
import axiosInstance from '../services/AxiosInterceptor';
import { Button } from '../components/ui/button.jsx';
import { Plus, Car } from 'lucide-react';
import { toast } from 'react-toastify';
import Layout from '../components/layout/Layout';
import MyListingCard from '../components/cars/MyListingCard';
import UpdateCarModal from '../components/cars/UpdateCarModal';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/listing/carsbyuser');
      setListings(response.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch your listings';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await axiosInstance.delete(`/listing/cars/${listingId}`);
        toast.success('Listing deleted successfully');
        fetchListings();
      } catch (err) {
        console.error('Error deleting listing:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to delete listing';
        toast.error(errorMessage);
      }
    }
  };

  const handleUpdate = (listingId) => {
    const car = listings.find(listing => listing._id === listingId);
    if (car) {
      setSelectedCar(car);
      setIsUpdateModalOpen(true);
    }
  };

  const handleUpdateSuccess = () => {
    fetchListings();
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-white min-h-screen">
        <div className="container-custom py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-blue-900 mb-4">My Listings</h1>
            <p className="text-blue-800/80 max-w-2xl mx-auto">
              Manage your car listings, update details, and track their performance all in one place.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center mb-12">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/listing/addlisting'}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Listing
            </Button>
          </div>
          
          {listings.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-blue-900 mb-3">No Listings Yet</h3>
              <p className="text-blue-800/80 mb-6">Start your journey by listing your first car for rent.</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
                onClick={() => window.location.href = '/listing/addlisting'}
              >
                List Your First Car
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <MyListingCard
                  key={listing._id}
                  id={listing._id}
                  car={listing.car}
                  rentalPricePerDay={listing.rentalPricePerDay}
                  location={listing.location}
                  availableFrom={listing.availableFrom}
                  availableTo={listing.availableTo}
                  images={listing.images}
                  availability={listing.availability}
                  createdAt={listing.createdAt}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Update Modal */}
          {selectedCar && (
            <UpdateCarModal
              isOpen={isUpdateModalOpen}
              onClose={() => {
                setIsUpdateModalOpen(false);
                setSelectedCar(null);
              }}
              car={selectedCar}
              onUpdate={handleUpdateSuccess}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyListings; 