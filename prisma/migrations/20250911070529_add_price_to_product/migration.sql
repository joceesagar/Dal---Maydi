-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "tags" TEXT[],
    "images" TEXT[],
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "volumes" TEXT[],
    "bundles" TEXT[],

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactMessages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserReviews" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "productImageUrl" TEXT NOT NULL,

    CONSTRAINT "UserReviews_pkey" PRIMARY KEY ("id")
);
