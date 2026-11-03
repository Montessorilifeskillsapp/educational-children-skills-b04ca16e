INSERT INTO public.school_invites (school_id, email, role, classroom_ids)
SELECT 'a091e088-b70a-4a83-b006-5ae34de2300c', 'taylor.stephie.1981@gmail.com', 'teacher', array_agg(id)
FROM public.classrooms WHERE school_id = 'a091e088-b70a-4a83-b006-5ae34de2300c'
ON CONFLICT (school_id, email) DO UPDATE SET role = EXCLUDED.role, classroom_ids = EXCLUDED.classroom_ids, accepted_at = NULL;