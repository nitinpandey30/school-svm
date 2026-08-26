import {
  BookOpen,
  Heart,
  Target,
  Users,
  ShieldCheck,
  Landmark,
} from "lucide-react";

function About() {
  return (
    <section className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <div className="bg-orange-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">

          <p className="text-white font-semibold tracking-wide">
            ABOUT OUR INSTITUTION
          </p>

          <p className="text-white max-w-3xl mx-auto mt-6 leading-7">
            A centre of learning dedicated to education, values,<br />
            discipline and the all-round development of young minds.
          </p>

        </div>
      </div>


      {/* ================= INTRODUCTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* School Image */}
          <div className="h-80 lg:h-96 rounded-2xl bg-white border border-slate-200 overflow-hidden">

            <img
              src="/school-building.jpg"
              alt="Shaheed Uttam Chand Saraswati Vidya Mandir Inter College"
              className="w-full h-full object-cover"
            />

          </div>


          {/* Introduction */}
          <div>

            <p className="text-blue-800 font-semibold">
              OUR INSTITUTION
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              शिक्षा, संस्कार और चरित्र निर्माण
            </h2>

            <p className="text-slate-600 mt-5 leading-7">
              Shaheed Uttam Chand Saraswati Vidya Mandir Inter College,
              Banbasa, is committed to providing students with a strong
              foundation of knowledge, values and discipline.
            </p>

            <p className="text-slate-600 mt-4 leading-7">
              Along with academic learning, the institution encourages
              students to develop confidence, leadership, responsibility
              and respect for society through sports, cultural activities
              and other co-curricular opportunities.
            </p>

            <p className="text-slate-600 mt-4 leading-7">
              We believe that true education goes beyond textbooks.
              Our aim is to help students become capable, disciplined
              and responsible individuals who can contribute positively
              to society.
            </p>

          </div>

        </div>


        {/* ================= OUR HISTORY ================= */}
        <div className="mt-20">

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div className="grid lg:grid-cols-[1fr_2fr]">

              {/* Title Side */}
              <div className="bg-red-900 text-white p-8 lg:p-10 flex flex-col justify-center">

                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Landmark size={28} />
                </div>

                <p className="text-red-200 font-semibold">
                  OUR LEGACY
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  A Legacy of Sacrifice & Education
                </h2>

              </div>


              {/* History */}
              <div className="p-8 lg:p-10">

                <p className="text-slate-600 leading-7">
                  The institution carries the name of
                  <span className="font-semibold text-slate-900">
                    {" "}Shaheed Uttam Chand
                  </span>
                  , whose memory continues to inspire the values of
                  courage, service and dedication associated with the
                  institution.
                </p>

                <p className="text-slate-600 mt-4 leading-7">
                  Shaheed Uttam Chand made the supreme sacrifice during the 1962 India–China War. In his memory, his wife, Smt. Saraswati Chand, donated land for the establishment of the institution. What began as an act of remembrance became a lasting contribution to education and the community.
                </p>

                

              </div>

            </div>

          </div>

        </div>


        {/* ================= MISSION & VISION ================= */}
        <div className="grid md:grid-cols-2 gap-6 mt-20">

          {/* Mission */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">

            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
              <Target size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-5">
              Our Mission
            </h2>

            <p className="text-slate-600 mt-3 leading-7">
              To provide meaningful education that develops academic
              ability, discipline, confidence and strong moral values
              in every student.
            </p>

          </div>


          {/* Vision */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Heart size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-5">
              Our Vision
            </h2>

            <p className="text-slate-600 mt-3 leading-7">
              To nurture knowledgeable, disciplined and responsible
              young citizens who are prepared to face the future while
              remaining connected to their values and culture.
            </p>

          </div>

        </div>


        {/* ================= OUR VALUES ================= */}
        <div className="mt-20">

          <div className="text-center mb-10">

            <p className="text-red-800 font-semibold">
              OUR VALUES
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              What We Believe In
            </h2>

            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Education becomes meaningful when knowledge is supported
              by character, discipline and a sense of responsibility.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <Feature
              icon={<BookOpen size={24} />}
              title="Quality Education"
              text="Building strong academic foundations and encouraging a genuine love for learning."
            />

            <Feature
              icon={<ShieldCheck size={24} />}
              title="Discipline"
              text="Encouraging students to develop responsibility, punctuality and self-discipline."
            />

            <Feature
              icon={<Heart size={24} />}
              title="Moral Values"
              text="Nurturing respect, honesty, compassion and a strong sense of responsibility."
            />

            <Feature
              icon={<Users size={24} />}
              title="Social Responsibility"
              text="Preparing students to become responsible and contributing members of society."
            />

          </div>

        </div>


      </div>

    </section>
  );
}


/* ================= FEATURE ================= */

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition">

      <div className="w-11 h-11 rounded-lg bg-red-50 text-red-800 flex items-center justify-center">
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

