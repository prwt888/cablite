// import { SignUp } from '@clerk/nextjs'

// export default function Page() {
//   return <SignUp />
// }
'use client'
import { SignUp } from '@clerk/nextjs'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    weight: ['400', '600', '700'],
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-poppins',
})

export default function Page() {
    return (
        <div className={`flex items-center justify-center m-10 ${poppins.variable}`} >
            <style jsx global>{`
           .cl-cardBox {
          border-radius: 25px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

             .cl-card {
                border-radius: 25px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                border: 1px ;
                                background: linear-gradient(to bottom, #e70303 20%, #ff6600 45%, #eeff03 90%) !important;


            }
                .cl-formButtonPrimary {
                  background: linear-gradient(to right, #ff6600, #e70303) !important;

                  width: 100%;
                  padding: 9px !important;
                  border-radius: 8px !important;
                  font-weight: 700 !important;
                  font-size: 0.9rem !important;
                  transition: all 0.2s ease;
                  border: 1px solid black !important;
                }
                  .cl-card {
          border: none !important;
          border-radius: 20px !important;
    
          font-family: var(--font-poppins), sans-serif;
        }
           .cl-socialButtonsBlockButton {
      
          background: white;
      ;
        }
          .cl-logoImage{
            width: 90px;
            height: 90px;
          }

        .cl-headerTitle {
          color: white;
          font-size: 2rem;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          text-align: center;
          font-family: var(--font-poppins), sans-serif;
        }

        .cl-headerSubtitle {
          color: white;
          text-align: center;
                    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          font-size: 0.8rem;
          font-weight: 600;
          font-family: var(--font-poppins), sans-serif;
        }
        .cl-socialButtonsBlockButton:hover {
          transform: translateY(-2px);
          background:white !important;
        }
        .cl-formFieldLabel,
        .cl-formFieldInput,
        .cl-footerActionText,
        .cl-footerActionLink,
        .cl-formButtonPrimary {
          font-family: var(--font-poppins), sans-serif;
        }
                .cl-formButtonPrimary:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }

                .cl-formFieldInput {
                  border: 0.5px solid black !important;
                  border-radius: 8px !important;
                  padding: 12px !important;
                  transition: all 0.2s ease;
                  
                }


               

        .cl-socialButtonsBlockButtonText {
           font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
        }

     `}</style>
            <SignUp />
        </div>
    )
}