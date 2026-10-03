export type IndustryKey =
  | "restaurant"
  | "cafe"
  | "clinic"
  | "office"
  | "beauty"
  | "hotel"
  | "retail"
  | "other";

export type Industry = {
  key: IndustryKey;
  label: string;
  short: string;
  personaHeadline: string;
  personaSub: string;
  problem: {
    icon: "grease" | "surface" | "focus" | "energy";
    title: string;
    solution: string;
  }[];
  lossPerMonth: {
    hours: number;
    laborCost: number;
  };
  testimonial: {
    name: string;
    role: string;
    story: string;
    metric: string;
  };
};

export const INDUSTRIES: Industry[] = [
  {
    key: "restaurant",
    label: "외식·주점",
    short: "식당",
    personaHeadline: "매일 밤 튀김기와 후드, 사장님 손으로 닦고 계세요?",
    personaSub: "야간 마감 청소를 통째로 대신합니다. 사장님은 매장 운영에만.",
    problem: [
      {
        icon: "grease",
        title: "튀김기·후드 기름때 매일 쌓이는데 손댈 시간이 없어요.",
        solution: "야간 팀이 분해 세척으로 정기 관리. 화재 위험도 함께 줄어듭니다.",
      },
      {
        icon: "surface",
        title: "홀 바닥·테이블 마감 청소로 직원이 매일 남아요.",
        solution: "저희가 밤에 다녀갑니다. 직원은 정시 퇴근, 사장님은 새 아침을 여세요.",
      },
      {
        icon: "focus",
        title: "청소 신경 쓰느라 메뉴·서비스에 집중이 안 됩니다.",
        solution: "청소를 통째로 위탁하고 사장님은 본업에만 집중하세요.",
      },
      {
        icon: "energy",
        title: "직원 피로가 쌓여 서비스 품질이 떨어지고 있어요.",
        solution: "야간 청소 부담이 사라지면 낮 서비스 컨디션이 눈에 띄게 살아납니다.",
      },
    ],
    lossPerMonth: { hours: 32, laborCost: 720000 },
    testimonial: {
      name: "김재현",
      role: "성남시 치킨전문점 · 6개월 이용",
      story:
        "직원들이 야근 안 해서 좋아합니다. 후드 관리도 정기적으로 되니까 화재 걱정이 없어졌어요.",
      metric: "월 32시간 절약",
    },
  },
  {
    key: "cafe",
    label: "카페·베이커리",
    short: "카페",
    personaHeadline: "머신 뒤편·냉장고 안쪽, 자주 미루고 계시죠?",
    personaSub: "손이 잘 안 가는 곳부터 저희가 정기적으로 관리합니다.",
    problem: [
      {
        icon: "grease",
        title: "에스프레소 머신 뒤편 청소가 늘 미뤄집니다.",
        solution: "월 1~2회 정기로 머신 주변·냉장고 안쪽까지 분해 세척.",
      },
      {
        icon: "surface",
        title: "마감 청소 시간이 늘어 폐점 시간이 밀립니다.",
        solution: "폐점 직후 시공. 다음 날 오픈 시간에 딱 맞춰 새 매장.",
      },
      {
        icon: "focus",
        title: "고객 응대와 매장 운영에 집중해야 하는데 청소가 발목을 잡아요.",
        solution: "청소는 저희가 통째로. 사장님은 커피와 손님에만.",
      },
      {
        icon: "energy",
        title: "혼자 운영하시면서 청소까지 감당하기가 힘드시죠.",
        solution: "1인 운영 카페에 최적화된 야간 청소 플랜을 제안드립니다.",
      },
    ],
    lossPerMonth: { hours: 24, laborCost: 540000 },
    testimonial: {
      name: "이수연",
      role: "서울 강남 브런치카페 · 4개월 이용",
      story:
        "머신 상태가 좋아지니 커피 맛이 안정됐어요. 뭐가 달라졌는지 손님들이 먼저 물어봅니다.",
      metric: "월 24시간 절약",
    },
  },
  {
    key: "clinic",
    label: "의원·클리닉",
    short: "의원",
    personaHeadline: "위생과 감염 관리, 매일 신경 쓰기 벅차시죠?",
    personaSub: "의료·의원 위생 기준에 맞춘 야간 청소로 신뢰를 지킵니다.",
    problem: [
      {
        icon: "surface",
        title: "매일 진료실·대기실 소독을 스태프가 감당하고 있어요.",
        solution: "야간 위생 관리로 스태프는 진료 업무에만 집중.",
      },
      {
        icon: "grease",
        title: "화장실·세면대 위생 상태가 항상 신경 쓰입니다.",
        solution: "화장실 정밀 소독을 정기 스케줄에 포함해 관리합니다.",
      },
      {
        icon: "focus",
        title: "환자 응대와 진료에 집중해야 하는데 청소까지 챙기기 힘들어요.",
        solution: "관리 리포트를 앱으로 받아보시고, 진료에만 집중하세요.",
      },
      {
        icon: "energy",
        title: "감염 관리 이슈가 언제나 걱정입니다.",
        solution: "위생 기준에 맞춘 정기 관리로 안심 진료 환경을 유지합니다.",
      },
    ],
    lossPerMonth: { hours: 20, laborCost: 480000 },
    testimonial: {
      name: "박지훈",
      role: "송파구 치과의원 원장 · 8개월 이용",
      story:
        "스태프들이 청소 스트레스에서 벗어나서 진료 응대 컨디션이 훨씬 좋아졌습니다.",
      metric: "월 20시간 절약",
    },
  },
  {
    key: "office",
    label: "사무실·학원",
    short: "사무실",
    personaHeadline: "직원들이 청소까지 부담하고 있진 않으세요?",
    personaSub: "출근 전 새 사무실, 야간 청소로 만들어 드립니다.",
    problem: [
      {
        icon: "surface",
        title: "직원 순번제로 청소하고 있어 불만이 쌓입니다.",
        solution: "야간 전문 팀이 대신. 직원 만족도와 업무 몰입도 모두 개선.",
      },
      {
        icon: "focus",
        title: "회의실·탕비실 관리가 늘 미뤄집니다.",
        solution: "정기 스케줄에 회의실·탕비실 세척을 포함합니다.",
      },
      {
        icon: "grease",
        title: "공기질·바닥 상태 유지가 어렵습니다.",
        solution: "공기 청정·바닥 소독을 포함한 종합 관리 플랜.",
      },
      {
        icon: "energy",
        title: "직원 채용 시 청소 환경이 발목을 잡습니다.",
        solution: "정돈된 사무실이 좋은 인재 유치에 도움을 드립니다.",
      },
    ],
    lossPerMonth: { hours: 16, laborCost: 400000 },
    testimonial: {
      name: "정민아",
      role: "판교 IT 스타트업 오피스매니저 · 3개월 이용",
      story:
        "직원들이 청소 순번에서 해방된 뒤 팀 분위기가 확 밝아졌어요.",
      metric: "월 16시간 절약",
    },
  },
  {
    key: "beauty",
    label: "미용·네일",
    short: "미용실",
    personaHeadline: "고객 앞에 늘 완벽하게 정돈된 매장을 원하시죠?",
    personaSub: "고객 첫인상을 좌우하는 세면대·의자·바닥까지 정기 관리.",
    problem: [
      {
        icon: "surface",
        title: "매일 머리카락·염색약 자국 정리가 힘겹습니다.",
        solution: "폐점 후 정밀 청소로 매일 아침 새 매장을 만들어 드립니다.",
      },
      {
        icon: "grease",
        title: "샴푸실 배수구·의자 관리가 신경 쓰입니다.",
        solution: "샴푸실·의자 정기 관리로 위생과 인상을 함께 지킵니다.",
      },
      {
        icon: "focus",
        title: "고객 응대에 집중해야 하는데 청소로 시간이 빠집니다.",
        solution: "청소 통째 위탁으로 시술과 응대에만 집중.",
      },
      {
        icon: "energy",
        title: "직원 이직 사유 1위가 청소 부담이라고 하죠.",
        solution: "야간 청소를 대신 맡아 직원 이직률을 낮춰 드립니다.",
      },
    ],
    lossPerMonth: { hours: 22, laborCost: 500000 },
    testimonial: {
      name: "최유진",
      role: "성수동 헤어살롱 · 5개월 이용",
      story:
        "샴푸실 관리가 정기적으로 되니까 고객 재방문율이 눈에 띄게 올랐어요.",
      metric: "월 22시간 절약",
    },
  },
  {
    key: "hotel",
    label: "숙박·게스트하우스",
    short: "숙박",
    personaHeadline: "객실 회전 사이 청소, 매번 걱정되시죠?",
    personaSub: "회전율과 위생, 두 마리 토끼를 저희가 잡아드립니다.",
    problem: [
      {
        icon: "surface",
        title: "체크아웃 후 청소 시간이 늘 부족합니다.",
        solution: "회전 스케줄에 맞춘 신속·정밀 청소 팀을 배치합니다.",
      },
      {
        icon: "grease",
        title: "화장실·욕조 위생 상태가 리뷰에 직결됩니다.",
        solution: "위생 등급 기준 정밀 소독으로 리뷰 별점을 지킵니다.",
      },
      {
        icon: "focus",
        title: "성수기·비수기 인력 조절이 어렵습니다.",
        solution: "계약형 야간 청소로 인력 리스크를 저희가 흡수합니다.",
      },
      {
        icon: "energy",
        title: "리뷰 관리가 사업 지속의 핵심입니다.",
        solution: "청결 리뷰 별점 상승 사례가 많습니다. 리뷰가 늘어납니다.",
      },
    ],
    lossPerMonth: { hours: 40, laborCost: 900000 },
    testimonial: {
      name: "한상철",
      role: "제주 게스트하우스 · 7개월 이용",
      story:
        "청결 별점이 4.2에서 4.8로 올랐어요. 여름 성수기 재예약이 확실히 늘었습니다.",
      metric: "청결 리뷰 4.2 → 4.8",
    },
  },
  {
    key: "retail",
    label: "마트·편의점",
    short: "마트",
    personaHeadline: "24시간 매장, 청소 시간을 언제 만드시나요?",
    personaSub: "영업 시간과 겹치지 않는 심야 청소로 매출을 지킵니다.",
    problem: [
      {
        icon: "surface",
        title: "24시간 운영으로 청소 시간이 없어요.",
        solution: "야간 새벽 시간대에 매출 영향 없이 시공합니다.",
      },
      {
        icon: "grease",
        title: "냉장·냉동 매대 관리가 어렵습니다.",
        solution: "매대 분해 세척과 냉장 위생 관리를 정기 스케줄로.",
      },
      {
        icon: "focus",
        title: "여러 지점을 동시에 관리하기 어렵습니다.",
        solution: "본사 일괄 계약으로 전 지점 동일 기준·리포트 관리.",
      },
      {
        icon: "energy",
        title: "야간 직원 청소 부담이 이직률을 높입니다.",
        solution: "청소는 전문 팀에게, 직원은 매장 운영에만.",
      },
    ],
    lossPerMonth: { hours: 28, laborCost: 640000 },
    testimonial: {
      name: "윤태식",
      role: "수원 편의점 다점포 운영 · 10개월 이용",
      story:
        "3개 지점 동시에 관리해 주시니 지점별로 신경 쓰던 스트레스가 사라졌어요.",
      metric: "월 28시간 절약",
    },
  },
  {
    key: "other",
    label: "그 외 공간",
    short: "기타",
    personaHeadline: "저희 공간은 좀 특별한데, 가능할까요?",
    personaSub: "1,200개 이상 공간 시공 경험. 대부분 가능합니다.",
    problem: [
      {
        icon: "focus",
        title: "우리 공간에 맞는 청소 업체를 찾기 어렵습니다.",
        solution: "공간 유형별 맞춤 시공. 우선 무료 방문 상담부터.",
      },
      {
        icon: "grease",
        title: "특수 설비나 소재 청소가 걱정됩니다.",
        solution: "6개 산업군 1,200+ 매장 시공 경험을 바탕으로 맞춤 대응.",
      },
      {
        icon: "surface",
        title: "정확한 견적을 받기가 어렵습니다.",
        solution: "현장 확인 후 투명한 견적을 드립니다. 부담 없이.",
      },
      {
        icon: "energy",
        title: "우선 상담부터 해보고 싶은데 부담스러워요.",
        solution: "상담 후 원치 않으시면 부담 없이 거절하셔도 됩니다.",
      },
    ],
    lossPerMonth: { hours: 20, laborCost: 480000 },
    testimonial: {
      name: "이명섭",
      role: "성남 스터디카페 · 4개월 이용",
      story:
        "일반 청소업체는 어떻게 해야 할지 모르는 특수 공간인데, BBK는 처음부터 정확하게 견적 주시더라고요.",
      metric: "맞춤 시공",
    },
  },
];

export const INDUSTRY_MAP = INDUSTRIES.reduce(
  (acc, i) => ({ ...acc, [i.key]: i }),
  {} as Record<IndustryKey, Industry>,
);

export const DEFAULT_INDUSTRY: IndustryKey = "restaurant";
