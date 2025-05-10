import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Star } from 'lucide-react';

const Review = ({ isOpen, onClose, onSubmit, loading }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!rating || rating < 1 || rating > 5) errs.rating = 'Rating is required (1-5)';
    if (!title.trim()) errs.title = 'Title is required';
    if (!review.trim()) errs.review = 'Review content is required';
    if (!username.trim()) errs.username = 'Name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ rating, title, review, username });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
   
<DialogContent className="w-full max-w-xs sm:max-w-md bg-blue-50 rounded-lg shadow-lg p-3 sm:p-6">
  <DialogHeader>
    <DialogTitle className="text-lg sm:text-2xl font-bold text-blue-900">Submit Review</DialogTitle>
  </DialogHeader>
  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
    {/* Rating */}
    <div>
      <Label className="text-blue-900 font-medium text-sm sm:text-base">Rating</Label>
      <div className="flex items-center space-x-1 mt-1">
        {[1,2,3,4,5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 sm:h-7 sm:w-7 cursor-pointer transition-colors ${star <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            data-testid={`star-${star}`}
          />
        ))}
      </div>
      {errors.rating && <div className="text-red-500 text-xs mt-1">{errors.rating}</div>}
    </div>
    {/* Title */}
    <div>
      <Label htmlFor="title" className="text-blue-900 font-medium text-sm sm:text-base">Title</Label>
      <Input
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border-blue-200 focus:border-blue-500 text-xs sm:text-sm"
        required
      />
      {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
    </div>
    {/* Review */}
    <div>
      <Label htmlFor="review" className="text-blue-900 font-medium text-sm sm:text-base">Review</Label>
      <Textarea
        id="review"
        value={review}
        onChange={e => setReview(e.target.value)}
        className="border-blue-200 focus:border-blue-500 min-h-[48px] sm:min-h-[80px] text-xs sm:text-sm"
        required
      />
      {errors.review && <div className="text-red-500 text-xs mt-1">{errors.review}</div>}
    </div>
    {/* Name */}
    <div>
      <Label htmlFor="username" className="text-blue-900 font-medium text-sm sm:text-base">Your Name</Label>
      <Input
        id="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border-blue-200 focus:border-blue-500 text-xs sm:text-sm"
        required
      />
      {errors.username && <div className="text-red-500 text-xs mt-1">{errors.username}</div>}
    </div>
    {/* Actions */}
    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-2">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="border-blue-200 text-blue-900 hover:bg-blue-50"
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </div>
  </form>
</DialogContent>


    </Dialog>
  );
};

export default Review;