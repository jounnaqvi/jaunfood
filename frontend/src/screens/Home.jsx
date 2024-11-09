import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carausel from "../components/Carausel";
import axios from "axios";

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      let response = await axios.post("http://localhost:5000/api/foodData");
      console.log(response.data, "17");

      setFoodItems(response.data[0].foodItems);
    } catch (error) {
      console.error("Failed to fetch food data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <Carausel />
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div
              key={item._id}
              style={{
                flex: '1',
                margin: '10px',
              }}
            >
              <Card item={item} />
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
