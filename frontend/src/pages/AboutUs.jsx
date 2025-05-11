import React, { useState } from 'react';
import { Check, Users, ShieldCheck, Clock, Car } from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import omImg from '../assets/om.jpg';

const AboutUs = () => {
  const [showTeam, setShowTeam] = useState(false);

  const toggleTeamSection = () => {
    setShowTeam(prev => !prev);
  };

  const teamMembers = [
    {
      name: 'Zohaib Zahid',
      role: 'Backend Developer',
      image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      bio: 'Zohaib handles the server-side logic and databases, making sure everything works behind the scenes.',
      linkedin: 'https://www.linkedin.com/in/{add your link here}/'
    },
    {
      name: 'Muhammad Danish',
      role: 'Frontend Developer',
      image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      bio: 'Danish focuses on building smooth and responsive interfaces to ensure an excellent user experience on Carloo.',
      linkedin: 'https://www.linkedin.com/in/muhammad-danish-066840222/'
 
    },
    {
      name: 'Ayesha Rafique',
      role: 'UI/UX Designer',
      image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      bio: 'Ayesha designs user-friendly layouts and flows to ensure Carloo is intuitive and visually appealing.',
      linkedin: 'https://www.linkedin.com/in/{add your link here}/'
    },
    {
      name: 'Fatima',
      role: 'Project Coordinator',
      image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      bio: 'Fatima manages project timelines and communication to keep the team aligned and on track.',
      linkedin: 'https://www.linkedin.com/in/{add your link here}/'
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen flex flex-col font-sans">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">About Carloo</h1>
            <p className="text-xl opacity-90 mb-6">
              We're reimagining car rental to make it simple, secure, and accessible for everyone.
            </p>
            <button
              onClick={toggleTeamSection}
              className="bg-white text-blue-700 font-medium py-2 px-4 rounded shadow hover:bg-gray-100 transition duration-300"
              aria-expanded={showTeam}
            >
              {showTeam ? 'Hide Team' : 'Meet the Team'}
            </button>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Carloo, our mission is to transform the car rental industry by creating a platform that connects car owners with people who need vehicles.
              </p>
              <p className="text-gray-700 mb-6">
                We're building a community where trust, transparency, and exceptional service are the foundation of every rental experience.
              </p>
              <div className="space-y-3">
                {[
                  'Affordable rates for every budget',
                  'Convenient pickup and delivery options',
                  'Safety and security for all users',
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="mr-3 bg-blue-100 p-1 rounded-full">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <img
                src={omImg}
                alt="Our Mission"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Values</h2>
            <p className="text-gray-700">
              These core principles guide everything we do at Carloo.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-7 w-7 text-blue-600" />,
                title: 'Community',
                text: 'Creating a community of car owners and renters built on trust.',
                bg: 'bg-blue-100',
              },
              {
                icon: <ShieldCheck className="h-7 w-7 text-teal-600" />,
                title: 'Trust & Safety',
                text: 'We prioritize user safety with strict verification and insurance.',
                bg: 'bg-teal-100',
              },
              {
                icon: <Clock className="h-7 w-7 text-blue-600" />,
                title: 'Convenience',
                text: 'Making car rentals quick and hassle-free.',
                bg: 'bg-blue-100',
              },
              {
                icon: <Car className="h-7 w-7 text-purple-600" />,
                title: 'Quality',
                text: 'Ensuring high standards for all listed vehicles.',
                bg: 'bg-purple-100',
              },
            ].map((val, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className={`${val.bg} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                  {val.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{val.title}</h3>
                <p className="text-gray-700">{val.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        {showTeam && (
          <section className="py-16 bg-white px-4">
            <div className="max-w-6xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Team</h2>
              <p className="text-gray-700">
                Meet the passionate people behind Carloo who are dedicated to transforming the car rental experience.
              </p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
  <a 
    key={index}
    href={member.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white border rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-lg"
  >
    <img 
      src={member.image} 
      alt={member.name} 
      className="w-full h-64 object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='18' text-anchor='middle' fill='%23999999'%3EProfile Image%3C/text%3E%3C/svg%3E";
      }}
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
      <p className="text-blue-600 mb-2">{member.role}</p>
      <p className="text-gray-700 mb-4 text-justify">{member.bio}</p>
      
      {/* LinkedIn button/icon */}
      <div className="flex justify-end">
        <div className="inline-flex items-center text-blue-700 hover:text-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          View Profile
        </div>
      </div>
    </div>
  </a>
))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default AboutUs;