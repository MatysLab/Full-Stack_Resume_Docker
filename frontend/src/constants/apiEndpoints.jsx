/**
 * API endpoints constants
 * Centralizing API endpoints makes it easier to manage and update them
 */

// Base API URL
export const API_BASE_URL = '/api';

// Resume data endpoints
export const ENDPOINTS = {
  // Resume data
  RESUME_DATA: `${API_BASE_URL}/`,
  
  // Profile endpoints
  PROFILE: `${API_BASE_URL}/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/profile/update`,
  
  // Experience endpoints
  EXPERIENCES: `${API_BASE_URL}/experiences`,
  EXPERIENCE_DETAIL: (id) => `${API_BASE_URL}/experiences/${id}`,
  ADD_EXPERIENCE: `${API_BASE_URL}/experiences/add`,
  UPDATE_EXPERIENCE: (id) => `${API_BASE_URL}/experiences/${id}/update`,
  DELETE_EXPERIENCE: (id) => `${API_BASE_URL}/experiences/${id}/delete`,
  
  // Education endpoints
  EDUCATION: `${API_BASE_URL}/education`,
  EDUCATION_DETAIL: (id) => `${API_BASE_URL}/education/${id}`,
  ADD_EDUCATION: `${API_BASE_URL}/education/add`,
  UPDATE_EDUCATION: (id) => `${API_BASE_URL}/education/${id}/update`,
  DELETE_EDUCATION: (id) => `${API_BASE_URL}/education/${id}/delete`,
  
  // Skills endpoints
  SKILLS: `${API_BASE_URL}/skills`,
  ADD_SKILL: `${API_BASE_URL}/skills/add`,
  UPDATE_SKILL: (id) => `${API_BASE_URL}/skills/${id}/update`,
  DELETE_SKILL: (id) => `${API_BASE_URL}/skills/${id}/delete`
};