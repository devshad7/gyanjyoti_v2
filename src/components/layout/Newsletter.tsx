import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Newsletter = () => {
  return (
    <>
        <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe Newsletter</h2>
            <p className="text-gray-600 mb-6">
              You learn today and earn tomorrow. The roots of education are
              bitter but the fruits are sweet.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter Your Email Address"
                className="flex-1"
              />
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
    </>
  );
};

export default Newsletter;
