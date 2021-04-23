# ecommerce_webapp_MERN_stack

**Project Detials:**

'App' refers to the development version having Node backend with Express and MongoDB, along with  React frontend.
'Containers_Version' refers to the app in containers network form based on Docker Compose
'Kubernetes_Version' refers to app in the pods network form based on deployments, services and Ingress

**Note:**

Make sure to add some data in the app right after turning on any of the three forms ie simple App / Containers_Version / Kubernetes_Version so that you see the app as in app's live link


**App Features:**

**Products, Blogposts Display:**
The App displays content, as well as lets users to upload content including bulk content upload if privileged.
Images are shown in masonry, as well as blogposts.

**Products, Blogposts Upload:**
The App lets a user to register with certain privileges, along with user avatar. The user if privileged to do so, could upload images / videos / blogposts, also he could upload those in bulk. The video gets uploaded and 4-5 screenshots are taken and everytime video card is shown, some new snapshot is selected to show.

**Cart:**
User can place products in cart, each product comes with  variations and can be set quantity. The price changes with the variation selected. The cart is then used to make the orders where the products along with its variations are checked in the backend and total price is calculated

**Payment Gateway:**
Paypal and Stripe is incorporated, however stripe wasnt set up due to lack of business account

**Bulk Products Upload:**
User can upload excel file with data, and images or videos to create images /  blogposts / videos in bulk at once. Excel files for filling data can be found at App/backend/excel_to_databases 

**Database:**
Anyone from MongoDB Atlas and Local MongoDB service can be used. Simply adjust the .env file with path App/backend/.env 

**Storage:**
Anyone from Local storage, AWS S3 or Google Cloud storage can be used. Simply adjust the .env file with path App/backend/.env 

**Authentication:**	
Includes jwt authentication and authorization system, as well as privileges system


**Usage:**

/login allows user to login
/signup allows user to sign up, select privileges and upload avatar
/home shows products and product categories, with a carousel and products in masonries
/products shows products, as well as allows to create single product if privileged
/blogposts shows blogposts, as well as allows to create single blogpost
/cart shows cart, and lets user to opt for product variations and set quantity
/order lets user to submit order either through paypal or stripe
/Bulk-Upload-Product-Category lets users to simply upload product category images, image names are pulled as category name
/Bulk-Upload-Product (found in footer) allows user to upload excel file with data and images for bulk products upload
/Bulk-Upload-Carousel (found in footer) allows user to upload excel file with data and images for bulk carousels upload
/Bulk-Upload-Blogpost (found in footer) allows user to upload excel file with data and images for bulk blogposts upload
