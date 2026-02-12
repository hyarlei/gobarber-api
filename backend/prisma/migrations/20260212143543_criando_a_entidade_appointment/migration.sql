-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);
