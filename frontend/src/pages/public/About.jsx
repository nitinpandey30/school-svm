import {
  BookOpen,
  GraduationCap,
  Heart,
  Target,
  Users,
} from "lucide-react";

function About() {
  return (
    <section className="bg-slate-50 min-h-screen">

      {/* Hero */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">

          <p className="text-blue-400 font-semibold">
            ABOUT OUR SCHOOL
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold mt-3">
            Building Knowledge, Character & Confidence
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto mt-6 leading-7">
            Our school is committed to providing quality education and
            creating a positive environment where students can learn,
            grow and achieve their goals.
          </p>

        </div>
      </div>


      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="h-80 lg:h-96 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
            <GraduationCap
              size={110}
              className="text-blue-200"
            />
          </div>

          <div>

            <p className="text-blue-600 font-semibold">
              WHO WE ARE
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              A Place Where Students Grow
            </h2>

            <p className="text-slate-600 mt-5 leading-7">
              Our school provides education for students from Class 6
              to Class 12. We focus on strong academic foundations
              while encouraging students to participate in sports,
              cultural activities and other co-curricular programs.
            </p>

            <p className="text-slate-600 mt-4 leading-7">
              We believe that education is not only about marks. It is
              also about discipline, responsibility, confidence and
              developing the ability to face the challenges of the
              future.
            </p>

          </div>

        </div>


        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-20">

          <div className="bg-white border border-slate-200 rounded-2xl p-8">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Target size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-5">
              Our Mission
            </h2>

            <p className="text-slate-600 mt-3 leading-7">
              To provide students with meaningful learning
              opportunities and help them develop the knowledge,
              skills and values required to become responsible
              individuals.
            </p>

          </div>


          <div className="bg-white border border-slate-200 rounded-2xl p-8">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Heart size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-5">
              Our Values
            </h2>

            <p className="text-slate-600 mt-3 leading-7">
              We encourage discipline, honesty, respect, hard work,
              curiosity and compassion so that students grow both
              academically and personally.
            </p>

          </div>

        </div>


        {/* What We Focus On */}
        <div className="mt-20">

          <div className="text-center mb-10">

            <p className="text-blue-600 font-semibold">
              OUR APPROACH
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              What We Focus On
            </h2>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <Feature
              icon={<BookOpen size={24} />}
              title="Quality Education"
              text="Strong academic foundations and effective learning."
            />

            <Feature
              icon={<Users size={24} />}
              title="Student Development"
              text="Encouraging confidence, communication and leadership."
            />

            <Feature
              icon={<Heart size={24} />}
              title="Character Building"
              text="Developing discipline, respect and responsibility."
            />

            <Feature
              icon={<GraduationCap size={24} />}
              title="Future Ready"
              text="Preparing students for higher education and future careers."
            />

          </div>

        </div>

      </div>

    </section>
  );
}


function Feature({ icon, title, text }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition">

      <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="font-semibold text-slate-900 mt-4">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-2 leading-6">
        {text}
      </p>

    </div>
  );
}

export default About;