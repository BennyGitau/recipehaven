import React from 'react'
import image from '../../assets/imgs/login-Signup.jpg'

function Ingredients({ print }) {
  return (
    <>
        <ul className="list-none w-full ml-5 space-y-2">
            <li>
                <div className="flex flex-col">
                    <img src={image} alt="recipe image" className="w-24 h-24 rounded-lg"/>
                    <span ref={print} className="">1 cup of pasta</span>
                </div>
            </li>
            <li>
                <div>
                    <img src={image} alt="recipe image" className="w-24 h-24 rounded-lg"/>
                    <span ref={print} className="">2 tablespoons olive oil</span>
                </div>
            </li>
            <li>
                <div>
                    <img src={image} alt="recipe image" className="w-24 h-24 rounded-lg"/>
                    <span className="">1 onion, chopped</span>
                </div>
            </li>
            <li>
                <div>
                    <img src={image} alt="recipe image" className="w-24 h-24 rounded-lg"/>
                    <span className="">2 cloves garlic, minced</span>
                </div>
            </li>
            <li>
                <div>
                    <img src={image} alt="recipe image" className="w-24 h-24 rounded-lg"/>
                    <span className="">1 teaspoon dried oregano</span>
                </div>
            </li>
        </ul>
    </>
  )
}

export default Ingredients