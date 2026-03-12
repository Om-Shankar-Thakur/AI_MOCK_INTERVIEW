"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    const db = await getDb();
    const feedbackCollection = db.collection("feedback");

    let resultId: string;

    if (feedbackId) {
      await feedbackCollection.updateOne(
        { _id: new ObjectId(feedbackId) },
        { $set: feedback },
        { upsert: true }
      );
      resultId = feedbackId;
    } else {
      const result = await feedbackCollection.insertOne(feedback);
      resultId = result.insertedId.toString();
    }

    return { success: true, feedbackId: resultId };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const db = await getDb();
    const interview = await db
      .collection("interviews")
      .findOne({ _id: new ObjectId(id) });

    if (!interview) return null;

    return {
      id: interview._id.toString(),
      role: interview.role,
      level: interview.level,
      questions: interview.questions,
      techstack: interview.techstack,
      createdAt: interview.createdAt,
      userId: interview.userId,
      type: interview.type,
      finalized: interview.finalized,
    } as Interview;
  } catch (error) {
    console.error("Error getting interview:", error);
    return null;
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const db = await getDb();
  const feedbackDoc = await db
    .collection("feedback")
    .findOne({ interviewId, userId });

  if (!feedbackDoc) return null;

  return {
    id: feedbackDoc._id.toString(),
    interviewId: feedbackDoc.interviewId,
    totalScore: feedbackDoc.totalScore,
    categoryScores: feedbackDoc.categoryScores,
    strengths: feedbackDoc.strengths,
    areasForImprovement: feedbackDoc.areasForImprovement,
    finalAssessment: feedbackDoc.finalAssessment,
    createdAt: feedbackDoc.createdAt,
  } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const db = await getDb();
  const interviews = await db
    .collection("interviews")
    .find({ finalized: true, userId: { $ne: userId } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return interviews.map((doc: any) => ({
    id: doc._id.toString(),
    role: doc.role,
    level: doc.level,
    questions: doc.questions,
    techstack: doc.techstack,
    createdAt: doc.createdAt,
    userId: doc.userId,
    type: doc.type,
    finalized: doc.finalized,
  })) as Interview[];
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const db = await getDb();
  const interviews = await db
    .collection("interviews")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  return interviews.map((doc: any) => ({
    id: doc._id.toString(),
    role: doc.role,
    level: doc.level,
    questions: doc.questions,
    techstack: doc.techstack,
    createdAt: doc.createdAt,
    userId: doc.userId,
    type: doc.type,
    finalized: doc.finalized,
  })) as Interview[];
}
